<template>
  <div class="radio-group">
    <label
      v-for="option in options"
      :key="option.id" class="radio"
      :class="{ selected: option.id === selected }"
      :style="{ background: option.id === selected ? option.color : null }"
    >
      <input type="radio" :value="option.id" :selected="option.id === selected" v-model="selected" @input="input"/>
      <div class="tick" :style="{ borderColor: option.color && option.id === selected ? 'transparent' : null }">
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24">
          <path
            :fill="option.color || '#7289da'"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17Z"
          />
        </svg>
      </div>
      <span>{{ option.name }}</span>
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class RadioButton extends Vue {
  @Prop() options!: { name: string; id: unknown }
  @Prop({ default: null }) value: unknown

  selected: unknown = null
  mounted () {
    this.selected = this.value
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input (event: any) {
    this.selected = event.target.value
    this.$emit('input', event.target.value)
  }

  @Watch('value')
  update () {
    this.selected = this.value
  }
}
</script>

<style lang="scss">
.radio-group {

  display: grid;
  gap: 0.5em;
}

.radio {
  user-select: none;
  border: $darker 1px solid;
  background: #2022254d;
  border-radius: 0.25em;
  padding: 0.75em;
  display: inline-flex;
  align-items: center;
  transition: background 0.1s ease-out;

  &.selected {
    background: $blurple;
  }

  input[type="radio"] {
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
