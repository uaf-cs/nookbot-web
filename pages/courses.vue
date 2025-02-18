<template>
  <div class="prose mx-auto">
    <FerpaNotice />
    <div v-if="error">
      <h2>Error loading courses</h2>
      <p>
        Something went wrong and the course list was not able to be retrived.
        Please try again later, or reach out on the discord server for more
        information.
      </p>
      <ErrorDisplay :error="error" />
    </div>
    <FormKit v-else type="form" method="POST">
      <SubjectList v-if="!pending" :subjects="result?.subjects ?? []" />
      <CourseList v-if="!pending" :courses="result?.courses ?? []" />
    </FormKit>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "require-auth",
});
const { result, pending, error } = await useLoader("courses");
</script>
