<template>
  <div class="prose mx-auto">
    <FerpaNotice />
    <FormKit type="form" method="POST">
      <SubjectList v-if="!pending" :subjects="result?.subjects ?? []" />
      <CourseList v-if="!pending" :courses="result?.courses ?? []" />
    </FormKit>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "require-auth",
});
const { result, pending } = await useLoader("courses");
</script>
