<template>
    <NuxtLayout name="default">
        <template #navbar-start>
            <!-- Save button -->
            <!-- TODO -->
    
        </template>
        <template #navbar-center>
            <!-- TODO -->
        </template>
        <template #navbar-end>
            <!-- Success -->
            <template v-if="updated">
                <button class="btn btn-sm btn-success">
                    <icon name="material-symbols:check" class="text text-lg"></icon>
                    Info updated
                </button>
            </template>
            <button v-else class="btn btn-sm btn-primary" @click="formNode?.submit()">
                <icon name="material-symbols:save" class="text text-lg"></icon>
                Save changes
            </button>
        </template>
        <template #dental-record>
            <li>
                <RecordsDentalChartLink />
            </li>
            <li>
                <RecordsExamLink :intraoralExamID="intraOralExamId"/>
            </li>
            <li>
                <RecordsTreatmentLink />
            </li>
        </template>
        <main class="flex flex-col gap-2">
            <!-- TODO: patch request -->
            <RecordsDentalChartForm v-if="initialValue" :initial-value :form-id=FORM_ID
                @submit="onSubmit" :useLocalStorage=false>
            </RecordsDentalChartForm>
            <div v-else>
                Could not find patient with ID: {{ route.query.patientId }}
            </div>
            <div v-if="status == 'pending'">
                Fetching patient...
            </div>
            <pre v-if="status == 'error'">
                {{ error }}
            </pre>
        </main>
    </NuxtLayout>
</template>
<script setup lang="ts">
import type { FormRequest } from '~/utils/records';
import { type FormKitNode } from "@formkit/core"
import { reset as resetDentalChart,useFormKitNodeById } from "@formkit/vue"
definePageMeta({
    layout: false,
})
const FORM_ID = 'dental-chart-edit'
const formNode = useFormKitNodeById(FORM_ID)
const route = useRoute("dental-chart-id")
const dayjs = useDayjs()
function resetForm() {
  resetDentalChart(FORM_ID, initialValue.value)
}
const { data: initialValue, status, error } = useAsyncData(async () => await $fetch(`/api/dental-charts/${route.params.id}`), {
    async transform(response) {
        if (response == undefined) {
            return {

            } as FormRequest
        }
        console.log(response)

        const { patient: patientInfo,user:doctor, lastDentalVisit, previousDentist, createdAt, updatedAt, manyConditions = [], ...medicalHistory } = response
 
        console.log(patientInfo)
        if (medicalHistory.allergies == null) {
            medicalHistory.allergies = []
        }
        if (medicalHistory.otherAllergy) {
            medicalHistory.allergies.push(medicalHistory.otherAllergy)
        }
        return {
            patientInfo: patientInfo as any,
            medicalHistory: {
                ...medicalHistory,
                lastHospitalization: dayjs(medicalHistory.lastHospitalization).toDate(),
                takingMedication: medicalHistory.prescribedOrNonprescribedMedicine != '',
                underMedicalTreatment: medicalHistory.medicalCondition != '',

                seriousIllnessOrOperation: medicalHistory.illnessOperation != '',
                allergies: medicalHistory.allergies,
                otherAllergy: medicalHistory.otherAllergy,
                hospitalized: medicalHistory.hospitalizationReason != '',
                bloodPressure: {
                    diastolic: medicalHistory.bloodDiastolicPressure,
                    systolic: medicalHistory.bloodSystolicPressure
                },
                manyConditions,
            },
            dentalHistory: {
                lastDentalVisit: dayjs(lastDentalVisit).toDate(),
                previousDentist,
            },
            intraoralExam: {
                id: response.intraoralExam?.id,
            },
        }
    }
})
const intraOralExamId = computed(() => {
    return initialValue.value?.intraoralExam?.id
})
watch(initialValue, (value) => {
    if (value) {
        formNode.value?.reset(value)
    }
})

async function onSubmit(data: FormRequest, node: FormKitNode) {
    console.log("trying to patch")
    console.log(data)
    const response = await $fetch(`/api/dental-charts/${route.params.id}`, {
        method: "patch",
        body: {
            ...data,
            id: parseInt(route.params.id),
        }
    })  
    console.log("PATCHED")
    const router = useRouter()
    router.push(`/dental-chart/${route.params.id}?updated=true`)
}
const updated = computed(() =>  route.query.updated == 'true')
</script>
