<template>
  <div class="prose mx-auto">
    <FerpaNotice />
    <Courses v-if="!pending" :courses="result?.courses ?? []" />
  </div>
</template>

<script setup lang="ts">
const { result, pending } = await useLoader("courses");
</script>
