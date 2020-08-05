<template>
  <div>
    <input type="text" :placeholder="placeholder" :value="value" @input="$emit('input', $event.target.value)">
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class TextInput extends Vue {
  @Prop({ default: '' }) value!: string
  @Prop({ default: '' }) placeholder!: string
}
</script>

<style lang="scss">
input[type="text"] {
  border: $darker 1px solid;
  background: #2022254d;
  border-radius: 0.25em;
  padding: 0.75em;
  color: $greyple;
  font-size: inherit;
  transition: border 0.1s ease-out;
  width: fit-content;
  width: calc(100% - 1.5em - 2px);

  &:focus {
    border-color: $blurple;
    outline: none;
  }

  &::placeholder {
    color: $greyple;
  }
}
</style>
