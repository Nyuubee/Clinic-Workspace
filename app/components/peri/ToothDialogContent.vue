<template>
    <div class="modal-box max-w-[98%]">
        <h3 class="font-bold text-lg">Teeth Editor</h3>
        <slot>

        </slot>
        <div class="modal-action">
            <form method="dialog" class="flex w-full place-content-between">
                <!-- if there is a button in form, it will close the modal -->
                 <div></div>
                <button class="btn btn-error" @click="$emit('close')">Close</button>
                <!-- <button class="btn btn-primary" @click="$emit('save')">
                    <Icon name="material-symbols:save" class="h-6 w-6" />
                    Save
                </button> -->
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
defineEmits<{
    close: [],
    save: []
}>()
</script>
