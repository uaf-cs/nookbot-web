<template>
  <div class="drawer auto-cols-fr">
    <LayoutNavbar />
    <div class="mx-4">
      <NuxtPage />
    </div>
    <LayoutDrawer />
  </div>
</template>

<script setup lang="ts">
// Use SSR-safe IDs for Headless UI
provideHeadlessUseId(() => useId());
</script>
