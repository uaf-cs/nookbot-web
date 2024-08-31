<template>
  <div>
    <div
      class="flex"
      :id="headerId"
      :aria-controls="collapseId"
      :aria-expanded="!collapsed"
      role="button"
      tabindex="0"
      @click="toggleCollapse"
      @keydown.prevent.space.enter="toggleCollapse"
    >
      <h3>
        <component
          :is="collapsed ? ChevronRightIcon : ChevronDownIcon"
          class="h-6 mb-1 mr-4 inline cursor-pointer"
        />
        {{ props.title }}
      </h3>
    </div>
    <div v-show="!collapsed" :id="collapseId" :aria-labelledby="headerId">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";

const props = withDefaults(
  defineProps<{ collapsed?: boolean; title: string }>(),
  {
    collapsed: false,
  },
);

const id = useId();
const headerId = `${id}-header`;
const collapseId = `${id}-collapse`;

const collapsed = ref(props.collapsed);
watchEffect(() => {
  collapsed.value = props.collapsed;
});

function toggleCollapse() {
  collapsed.value = !collapsed.value;
}
</script>
