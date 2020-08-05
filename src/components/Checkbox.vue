<template>
  <label class="checkbox" :class="{ checked: checked }">
    <input type="checkbox" :checked="value" @input="input"/>
    <div class="tick">
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24">
        <path
          fill="#7289da"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17Z"
        />
      </svg>
    </div>
    <span><slot></slot></span>
  </label>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class Checkbox extends Vue {
  @Prop({ default: false }) value!: boolean
  checked = false
  mounted () {
    this.checked = this.value
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input (event: any) {
    this.checked = event.target.checked
    this.$emit('input', event.target.checked)
  }

  @Watch('value')
  update () {
    this.checked = this.value
  }
}
</script>

<style lang="scss">
.checkbox {
  user-select: none;
  border: $darker 1px solid;
  background: #2022254d;
  border-radius: 0.25em;
  padding: 0.75em;
  display: inline-flex;
  align-items: center;
  transition: background 0.1s ease-out;

  &.checked {
    background: $blurple;
  }

  input[type="checkbox"] {
    display: none;

    &:checked + .tick {
      background: $white;

      svg {
        display: initial;
        width: 100%;
        height: 100%;
      }
    }
  }

  .tick {
    display: block;
    height: 1.5em;
    width: 1.5em;
    border: $greyple 1px solid;
    border-radius: 0.25em;

    svg {
      display: none;
    }
  }

  span {
    margin-left: 0.75em;
  }
}
</style>
