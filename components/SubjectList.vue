<template>
  <CollapseDetails title="Subject Roles">
    <p>
      Subject roles allow you to sign up for optional notifications that relate
      to different topics and departments. They are fully optional and do not
      impact access to course channels.
    </p>
    <div class="not-prose">
      <FormKit
        type="checkbox"
        name="subjects"
        :options="subjects.map(subjectToOptions)"
      />
    </div>
  </CollapseDetails>
</template>

<script setup lang="ts">
import type { Subject } from "~/types";

const props = defineProps<{ subjects: Subject[] }>();

function subjectToOptions(subj: Subject) {
  return { label: subj.name, value: subj.id };
}
</script>
