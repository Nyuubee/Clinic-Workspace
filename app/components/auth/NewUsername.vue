<template>
    <label class="label">
      <span class="label-text text-xl">Username:</span>
      <span class="label-text-alt">
        <slot name="top-right-label"></slot>
      </span>
    </label>
    <input
      class="input input-error"
      type="username"
      name="username"
      id="username"
      placeholder="username"
      required
      v-model="username"
      @input="onInput"
      :class="{...{'input-error':isInvalid},...inputClass}"
    />
    <label class="label">
      <!-- <span class="label-text-alt text-lg text-info">
      </span> -->
      <span class="label-text-alt">
        <slot name="bottom-right-label"></slot>
      </span>
    </label>
  </template>
  <script setup lang="ts">
import useInvalid from '~/composables/auth/useInvalid';

  const props = withDefaults(defineProps<{inputClass?:Record<string,boolean>}>(), {
    inputClass: {} as Record<string,boolean>
  })
  const username = defineModel<string>();
  const {isInvalid, onInput} = useInvalid();
  </script>
