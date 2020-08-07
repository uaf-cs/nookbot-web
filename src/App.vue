<template>
  <div id="app">
    <div v-if="loading">Loading...</div>
    <div v-else-if="user === null">
      <p>
        Hey there! Welcome to the UAF Computer Science and Math Discord server.
        Before we get started, we just want to verify that you're part of the UA
        system, and as such we'll need you to log into your UA assigned Google
        account, as well as your Discord account so we know who to tie it to.
      </p>
      <p>
        Here's exactly what'll happen when you click the link to log in.
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
          you'll automatically be approved and allowed to view channels on the
          server. More information will be given on the page when you arrive
          there.
        </li>
      </ol>
      Click <a href="/api/auth/login">this link</a> when you're ready to get set
      up.
    </div>
    <div v-else-if="!user.inGuild">
      <p>
        Hey! It's nice to meet you {{ user.google.displayName }}, but it looks
        like you're not yet in the Discord server.
        <a href="https://chat.cs.uaf.edu/">Use this link</a> to join that, then
        come back here.
      </p>
    </div>
    <div v-else>
      <p class="note">
        Hey there, {{ user.google.displayName }}
        ({{ user.discord.username}}#{{ user.discord.discriminator }})!
        Welcome to the UAF Computer Science and Math Discord server. Select your
        academic status and any classes you're participating in below and we'll
        get your roles set up on the server. Click
        <a href="/api/auth/logout">here</a> to log out.
      </p>
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
                @input="updateCourse(course.id, $event)"
              >
                {{ course.section }} - {{ course.instructor }}
              </Checkbox>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

import { Course, User } from './custom'

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
  loading = true
  search = ''

  courses: Course[] = []
  mappedCourses: { [key: string]: { [key: string]: Course[] } } = {}

  user: User|null = null

  async beforeMount () {
    // Fetch user data
    const userRequest = await fetch('/api/@me')
    if (userRequest.ok) {
      this.user = await userRequest.json()
    }
    // Fetch all courses
    const courseRequest = await fetch('/api/courses')
    this.courses = await courseRequest.json()
    this.courses = this.courses.sort((a, b) => {
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

  updateCourse (course: string, enrolled: boolean) {
    if (enrolled) {
      fetch(`/api/@me/courses/${course}`, { method: 'POST' })
    } else {
      fetch(`/api/@me/courses/${course}`, { method: 'DELETE' })
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
  background: $dark;
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
}

.note {
  color: $greyple;
}

.selections {
  display: grid;
  gap: 0.5em;
}

@media screen and (max-width: 50em) {
  #app {
    padding: 0;
  }
}
</style>
