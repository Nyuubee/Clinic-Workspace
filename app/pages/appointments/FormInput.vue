<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      :id="id"
      v-model="inputValue"
      type="text"
      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps({
  modelValue: String,
  label: String
})

const emits = defineEmits(['update:modelValue'])

const inputValue = ref(props.modelValue)

watch(inputValue, (newValue) => {
  emits('update:modelValue', newValue)
})

watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue
})
</script>
