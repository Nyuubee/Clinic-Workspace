<template>
    <div class="text-lg">
        <div>
            Name: <span class="underline">{{ fullName }}</span>
        </div>
        <span>
            Age: <span class="underline">{{ age }}</span> Sex: <span class="underline">{{ patientInfo.sex }}</span>
            Date: <span class="underline">{{ today }}</span>
        </span>
    </div>
</template>
<script setup lang="ts">
import { calcAge } from '~/server/utils/dayjs';
import { toFullName } from '~/utils/records/usePatientFullName';
import { type FullName } from '~/utils/records/usePatientFullName';
const props = defineProps<{ patientInfo: FullName & {
    birthDate: string,
    sex: 'male'|'female',
} }>()
const fullName = computed(() => toFullName(props.patientInfo));

const dayjs = useDayjs()
const age = computed(() => {
    return calcAge(props.patientInfo.birthDate)
})
// format: Month, day, year
const today = ref(dayjs().format('MMMM DD, YYYY'))
</script>
