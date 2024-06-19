<template>
 
    <main class="flex flex-col justify-center items-center gap-2">
{{ data }}
    </main>
</template>
<script setup lang="ts">
const {data} = useAuth();
</script>
