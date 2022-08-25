<template>
  <div id="app">
    <div v-if="false">
      <p>Fetching user info and course list...</p>
      <span v-if="error">{{ error }}. Please report this issue to an admin.</span>
    </div>
    <div v-else-if="user === null">
      <h1>UAF Students Discord</h1>
      <p>
        Hey there! Welcome to the UAF Students Discord server. We currently
        provide communications for Math, Chemistry, and Computer Science. Before
        we get started, we just want to verify that you're part of the UA
        system, and as such we'll need you to log into your UA assigned Google
        account, as well as your Discord account so we know who to tie it to.
      </p>
      <h2>Important note about FERPA</h2>
      <p>
        By signing into this service you acknowledge that other members of the
        UAF Students Discord community will be able to view any courses that
        you have joined via this service. Only courses you select on this
        website will be shown on your Discord profile. The UAF Students Discord
        staff and administrators do not have access to any data from UAF or the
        University of Alaska outside of approved directory information.
      </p>
      <div class="selections">
        <Checkbox :value="ferpaAcknowledgement" @input="ferpaAcknowledgement = !ferpaAcknowledgement">
          Acknowledge and Accept
        </Checkbox>
      </div>
      <div v-if="ferpaAcknowledgement">
        <p>
          Here's exactly what'll happen when you click Log In.
        </p>
        <ol>
          <li>
            You'll be directed to Google's log in page. You <strong>must</strong>
            select your UA assigned Google account here (ending in @alaska.edu) or
            you will not be able to continue.
          </li>
          <li>
            After logging in with Google, you'll be directed to Discord's log in
            page. Log in with your Discord account, and allow Nookbot to access
            your account information.
          </li>
          <li>
            Finally, you'll be directed here. If all your accounts work out,
            you'll automatically be added to the server and allowed to view
            channels there. More information will be given on the page when you
            arrive there.
          </li>
        </ol>

        <div class="button-flex">
          <a href="/api/auth/login">Log In</a>
        </div>
      </div>
      <p>
        Already joined the Discord server?
        <a href="https://discord.com/channels/478810581273673746" target="_blank">
          Here's a link directly to it
        </a>. <span class="note">This link will only work if you've already
        logged into this website.</span>
      </p>
    </div>
    <div v-else-if="!user.inGuild">
      <p>
        Hey! It's nice to meet you {{ user.google.displayName }}, but it looks
        like you're not yet in the Discord server. Please refresh this page, and
        if the issue continues <a href="/api/auth/logout">log out</a> and log
        back in.
      </p>
    </div>
    <div v-else>
      <p class="note">
        Hey there, {{ user.google.displayName }}
        ({{ user.discord.username}}#{{ user.discord.discriminator }})!
        Welcome to the UAF Computer Science and Math Discord server. Select your
        academic status and any classes you're participating in below and we'll
        get your roles set up on the server.
      </p>
      <div class="button-flex">
        <a href="/api/auth/logout">Log Out</a>
        <a href="https://discord.com/channels/478810581273673746/539649299798032384">Open Discord</a>
      </div>
      <p v-if="!user.updatedNickname">
        We weren't able to update your nickname to match your
        preferred name. Please update it yourself or reach out to an admin for
        assistance.
      </p>
      <div v-if="user.status !== 'teacher'">
        <h2>Academic Status</h2>
        <p class="note">Are you a teacher? Reach out to someone on the admin team and we'll get you set up.</p>
        <RadioButton
          v-model="user.status"
          :options="[
            {name: 'Student', id: 'student', color: 'rgb(52, 152, 219)' },
            {name: 'Alumnus', id: 'alumnus', color: 'rgb(163, 99, 247)' }
          ]"
          @input="updateStatus"
        ></RadioButton>
      </div>
      <h2>Subject Selection</h2>
      <p class="note">
        Selecting any of these options allows you to easily be notified about
        department announcements. It's strongly suggested that you opt into all
        subjects that you have a course in.
      </p>
      <div class="selections">
        <Checkbox
          v-for="subject of subjects"
          :key="subject.id"
          :value="user.subjects.includes(subject.id)"
          @input="updateSubject(subject.id)"
        >
          {{ subject.name }}
        </Checkbox>
      </div>

      <h2>Course Selection</h2>
      <p class="note">
        Select any courses that you are currently enrolled in, if you'd like.
        Selecting a course adds you to a private channel for that course that
        allows you to discuss the course and course material directly with other
        students as well as your instructor, if they have joined the server.
      </p>
      <TextInput v-model="search" placeholder="Search Courses" />

      <div v-for="subject in Object.keys(mappedCourses).sort()" :key="subject">
        <h3>{{ subject }}</h3>
        <div>
          <div v-for="course in Object.keys(mappedCourses[subject]).sort()" :key="course">
            <h4>{{ course }}</h4>
            <div class="selections">
              <Checkbox
                v-for="course of mappedCourses[subject][course]"
                :key="course.id"
                :value="user.classes.includes(course.id)"
                @input="updateCourse(course.id)"
              >
                {{ course.instructor.split(',').map(s => s.trim()).reverse().join('. ') }}
              </Checkbox>
            </div>
          </div>
        </div>
      </div>
      <div class="footer" v-if="changes.length + subjectChanges.length > 0">
        <span>{{ changes.length + subjectChanges.length }} pending changes</span>
        <button @click="saveCourses">Save selection</button>
      </div>
    </div>
    <div class="non-discrimination note">
      <p>
        UAF is an AA/EO employer and educational institution and prohibits
        illegal discrimination against any individual. Learn more about UA's
        <a href="https://www.alaska.edu/nondiscrimination">notice of nondiscrimination</a>.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

import { Course, Subject, User } from './custom'

import Checkbox from '@/components/Checkbox.vue'
import RadioButton from '@/components/RadioButton.vue'
import TextInput from '@/components/TextInput.vue'

@Component({
  components: {
    Checkbox,
    RadioButton,
    TextInput
  }
})
export default class Home extends Vue {
  ferpaAcknowledgement = false

  loading = true
  search = ''

  courses: Course[] = []
  mappedCourses: { [key: string]: { [key: string]: Course[] } } = {}

  subjects: Subject[] = []

  user: User|null = null

  error: string|null = null

  changes: string[] = []
  subjectChanges: string[] = []

  async beforeMount () {
    // Fetch user data
    const userRequest = await fetch('/api/@me')
    if (userRequest.ok) {
      this.user = await userRequest.json()
      // Fetch all courses
      const courseRequest = await fetch('/api/courses')
      const { courses, subjects } = await courseRequest.json()
      this.subjects = subjects.sort()
      this.courses = courses.sort((a: Course, b: Course) => {
        if (`${a.course}-${a.section}` < `${b.course}-${b.section}`) { return -1 }
        if (`${a.course}-${a.section}` > `${b.course}-${b.section}`) { return 1 }
        return 0
      })
      for (const course of this.courses) {
        const key = `${course.subject}-${course.course} | ${course.title}`
        if (this.mappedCourses[course.subject] === undefined) {
          this.mappedCourses[course.subject] = {}
        }
        if (this.mappedCourses[course.subject][key] === undefined) {
          this.mappedCourses[course.subject][key] = []
        }
        this.mappedCourses[course.subject][key].push(course)
      }
      this.loading = false
    } else if (userRequest.status === 401) {
      this.loading = false
    } else {
      this.error = `${userRequest.status} ${userRequest.statusText}`
    }
  }

  @Watch('search')
  filter () {
    this.mappedCourses = {}
    for (const course of this.courses) {
      if (
        course.subject.toLowerCase().includes(this.search.toLowerCase()) ||
        course.course.toLowerCase().includes(this.search.toLowerCase()) ||
        course.section.toLowerCase().includes(this.search.toLowerCase()) ||
        course.title.toLowerCase().includes(this.search.toLowerCase()) ||
        course.instructor.toLowerCase().includes(this.search.toLowerCase())
      ) {
        const key = `${course.subject}-${course.course} | ${course.title}`
        if (this.mappedCourses[course.subject] === undefined) {
          this.mappedCourses[course.subject] = {}
        }
        if (this.mappedCourses[course.subject][key] === undefined) {
          this.mappedCourses[course.subject][key] = []
        }
        this.mappedCourses[course.subject][key].push(course)
      }
    }
  }

  updateCourse (course: string) {
    const index = this.changes.indexOf(course)
    if (index === -1) {
      this.changes.push(course)
    } else {
      // Remove change from changeset
      this.changes.splice(index, 1)
    }
  }

  updateSubject (subject: string) {
    const index = this.subjectChanges.indexOf(subject)
    if (index === -1) {
      this.subjectChanges.push(subject)
    } else {
      // Remove change from changeset
      this.subjectChanges.splice(index, 1)
    }
  }

  async saveCourses () {
    if (this.user === null) {
      return
    }
    const promises: Promise<Response>[] = []
    for (const course of this.changes) {
      const index = this.user.classes.indexOf(course)
      if (index === -1) {
        this.user.classes.push(course)
        promises.push(fetch(`/api/@me/courses/${course}`, { method: 'POST' }))
      } else {
        this.user.classes.splice(index, 1)
        promises.push(fetch(`/api/@me/courses/${course}`, { method: 'DELETE' }))
      }
    }
    this.changes = []
    for (const subject of this.subjectChanges) {
      const index = this.user.subjects.indexOf(subject)
      if (index === -1) {
        this.user.classes.push(subject)
        promises.push(fetch(`/api/@me/subjects/${subject}`, { method: 'POST' }))
      } else {
        this.user.classes.splice(index, 1)
        promises.push(fetch(`/api/@me/subjects/${subject}`, { method: 'DELETE' }))
      }
    }
    this.subjectChanges = []
    const responses = await Promise.all(promises)

    // Update user data
    const userRequest = await fetch('/api/@me')
    if (userRequest.ok) {
      this.user = await userRequest.json()
    }

    const ok = responses.reduce((prev, curr) => prev && curr.ok, true)
    if (ok) {
      this.$toasted.show('Classes updated successfully', {
        duration: 3000
      })
    } else {
      this.$toasted.error('Errors encountered. Try reloading this page.')
    }
  }

  updateStatus (status: string) {
    fetch('/api/@me/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    })
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

body {
  background-color: $dark;
  color: $white;
  overflow-y: scroll;
}

h1, h2, h3, h4, h5 {
  font-weight: normal;
}

h3 {
  font-size: 1.35rem;
}

h4 {
  color: lighten($greyple, 10);
}

p, ul, ol {
  line-height: 1.75em;
}

li {
  margin-bottom: 1em;
}

a {
  color: $link;
}

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 75em;
  margin: auto;
  padding: 0 5em;
  margin-bottom: 7em;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 1em);
}

.note {
  color: $greyple;
}

.selections {
  display: grid;
  gap: 0.5em;
}

@media only screen and (min-width: 600px) {
  .toasted-container.top-right {
    top: 1em !important;
    right: 2em !important;
  }
  .toast {
    margin-top: 1rem !important;
  }
}

.toast {
  background-color: $blurple !important;
  font-family: 'Roboto', sans-serif !important;
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;
  margin-top: 0 !important;
}

.toast.error {
  background-color: $error !important;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: $darker;
  padding: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    border: none;
    border-radius: 0.25em;
    background-color: $blurple;
    color: $white;
    padding: 1em;
  }
}

.non-discrimination {
  margin-top: auto;
  text-align: center;
}

.button-flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1em;

  a {
    border: none;
    border-radius: 0.25em;
    background-color: $blurple;
    color: $white;
    padding: 1em;
    text-decoration: none;
  }
}

@media screen and (max-width: 50em) {
  #app {
    padding: 0;
  }
}
</style>
