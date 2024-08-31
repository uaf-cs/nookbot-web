<template>
  <CourseListSubject
    v-for="[subject, courses] in subjectMap"
    :key="subject"
    :courses="courses"
    :subject="subject"
  />
</template>

<script setup lang="ts">
import type { Course } from "~/server/actions/courses";

const props = defineProps<{
  courses: Course[];
}>();

const subjectMap = computed(() => {
  const mapped = props.courses.reduce(
    (acc, curr) => {
      if (!(curr.subject in acc)) {
        acc[curr.subject] = [];
      }
      acc[curr.subject].push(curr);
      return acc;
    },
    {} as Record<string, Course[]>,
  );
  return Object.entries(mapped).sort(([a], [b]) => a.localeCompare(b));
});
</script>
