<template>
    <ClientOnly>
        <FormKit type="form" :id="formId" :name="formId" :value="initialValue" :useLocalStorage="useLocalStorage"
            @submit="(data, node) => $emit('submit', data, node)" v-slot="vSlot"
            form-class="w-max-4/5 flex flex-col self-center gap-y-4" :actions="false">
            <div class="divider divider-secondary">Patient Information Record</div>
            <records-patient-info-form />
            <div class="divider divider-secondary">Dental History</div>
            <FormKitSchema :schema="dentalRecordSchema">
            </FormKitSchema>
            <div class="divider divider-secondary">Medical History</div>
            <FormKitSchema :schema="medicalHistorySchema">
            </FormKitSchema>
            <slot v-bind="vSlot">

            </slot>
        </FormKit>
    </ClientOnly>
</template>
<script setup lang="ts">
import type { FormRequest, PartialFormRequest } from '~/utils/records';
import { useMedicalHistorySchema, useDentalHistorySchema } from '~/utils/records/medicalHistory';
import { type FormKitNode } from "@formkit/core"
const props = defineProps<{
    // initialValue: FormRequest,
    formId: string,
    useLocalStorage: boolean,
    initialValue?: PartialFormRequest,
}>()

defineEmits<{
    submit: [value: FormRequest, node: FormKitNode]
}>()


const { schema: medicalHistorySchema } = useMedicalHistorySchema()
const { schema: dentalRecordSchema } = useDentalHistorySchema()

</script>
<style scoped>
:deep(div[data-type=radio] .formkit-fieldset) {
    @apply flex flex-row gap-x-2;
}

:deep(div[data-type=radio] .formkit-options) {
    @apply ml-4 flex flex-row gap-x-4;
}

:deep(.formkit-option .formkit-label) {
    @apply pr-2;
}
</style>
