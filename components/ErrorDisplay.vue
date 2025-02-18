<template>
  <div class="border border-red-300 bg-red-100 rounded px-6">
    <p>{{ errorMessage }}</p>
    <div v-html="error.data"></div>
    <pre
      v-if="
        error.data?.message
      ">{{ error.data.message }}<template v-html="error.data.stack"></template></pre>
  </div>
</template>

<script setup lang="ts">
import type { H3Error } from "h3";
import { FetchError } from "ofetch";

const props = defineProps<{ error: FetchError<any> }>();
const errorMessage = computed(() => {
  console.log(props.error.data);
  return props.error.statusMessage ?? props.error.message;
});
</script>
