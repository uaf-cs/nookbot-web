<template>
  <CollapseDetails :title="subject">
    <div class="not-prose" v-for="(courses, level) in groupedCourses">
      <div class="divider divider-start">{{ level }} level</div>
      <FormKit
        type="checkbox"
        :name="`courses`"
        :options="courses.map(courseToOptions)"
      />
    </div>
  </CollapseDetails>
</template>

<script setup lang="ts">
import type { Course } from "~/server/actions/courses";

const props = defineProps<{
  subject: string;
  courses: Course[];
}>();

const sortedCourses = computed(() => {
  return [...props.courses].sort((a: Course, b: Course) => {
    if (`${a.course}-${a.section}` < `${b.course}-${b.section}`) {
      return -1;
    }
    if (`${a.course}-${a.section}` > `${b.course}-${b.section}`) {
      return 1;
    }
    return 0;
  });
});

const groupedCourses = computed(() => {
  return sortedCourses.value.reduce(
    (acc, curr) => {
      const courseCode = curr.course.replace(/\D/g, "");
      const courseNumber = Number(courseCode);
      const courseLevel = (Math.floor(courseNumber / 100) * 100).toString();
      if (!(courseLevel in acc)) {
        acc[courseLevel] = [];
      }
      acc[courseLevel].push(curr);
      return acc;
    },
    {} as Record<string, Course[]>,
  );
});

function courseToOptions(course: Course) {
  return {
    value: course.id,
    label: `${course.course} ${course.title}`,
    help: course.instructor,
  };
}
</script>
