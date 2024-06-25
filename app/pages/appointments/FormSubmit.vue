<template>
  <div>
    <button type="submit">{{ label }}</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  label: String,
});

</script>
