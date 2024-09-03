<template>
  <div class="prose mx-auto">
    <FerpaNotice />
    <FormKit type="form" method="POST">
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
