<template>
  <NuxtLayout name="default">
    <template #navbar-center>
      <!-- TODO -->
    </template>
    <template #navbar-end>
      <!-- save button -->
      <template v-if="registered">
          <button class="btn btn-sm btn-success">
            <Icon name="mdi:check" class="text text-lg" />
            Patient Registered
          </button>
      </template>
      <button v-if="!$route.query.registered" class="btn btn-sm btn-primary" @click="formNode?.submit()">
        <Icon name="mdi:account-plus" class="text text-lg" />
        Register Patient
      </button>
    </template>
    <main class="flex flex-col gap-2">
      <!-- Must wait for this to complete before rendering -->
      <RecordsDentalChartForm :initialValue useLocalStorage :form-id=FORM_ID @submit="onSubmit" v-slot={value}>
        <div class="formkit-actions sticky bottom-1 bg-base-100 flex flex-col items-center gap-y-4">
          <template v-if="postSuccess">
            <FormKit label="Patient Registered" type="button" input-class="btn btn-success w-max">
              <template #suffixIcon>
                <Icon name="mdi:check" class="text-xl" />
              </template>
            </FormKit>
            <NuxtLink :to="{
              path: `/dental-chart/${$route.query.patientId}/intraoral-exam`,
              query: { patientId: $route.query.patientId, dentalRecordId: $route.query.dentalRecordId }
            }" class="btn btn-primary">
              Start Intraoral Exam
            </NuxtLink>
          </template>
          <template v-if="status == 'error'">
            <pre>
                {{ patientRegistrationError }}
              </pre>
          </template>
        </div>
      </RecordsDentalChartForm>
    </main>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { type FormKitNode } from "@formkit/core"
import { useFormKitNodeById } from "@formkit/vue"
import { createPatientInfo } from '~/utils/records/PatientInfo';
import type { FormRequest, PartialFormRequest } from '~/utils/records';
definePageMeta({
  layout: false
})
const FORM_ID = 'dentalChart'
const formNode = useFormKitNodeById(FORM_ID)
const answer = ref<FormRequest>()

const { data: response, error: patientRegistrationError, execute: postPatient, status, clear: clearFetch } = useAsyncData(async () => $fetch("/api/dental-charts", {
  method: 'POST',
  body: answer.value,
}), {
  immediate: false,
})

function resetForm() {
  formNode.value?.reset()
  clearFetch()
}
const postSuccess = computed(() => status.value == 'success')

async function onSubmit(data: FormRequest, node: FormKitNode) {
  answer.value = data
  console.log(answer.value)
  await postPatient()
  const router = useRouter()
  router.push({
    query: { patientId: response.value?.id }
  })
}

const initialValue = ref<PartialFormRequest>({
  patientInfo: createPatientInfo(),
  dentalHistory: {},
  medicalHistory: {}
})
const route = useRoute()
const patientId = computed(() => route.query.patientId)
const { data: fetchedPatientInfo } = useAsyncData(async () => {
  const patientInfo = await $fetch(`/api/patients/${patientId.value}`)
  return {
    patientInfo,
    dentalHistory: {},
    medicalHistory: {}
  }
}, {
  watch: [patientId]
})
const registered = computed(() => route.query.registered == 'true')
watch(() => status.value == 'success', (succes) => {
  if (succes) {
    const router = useRouter()
    router.push({
      query: { registered: "true"}
    })    
  }
})

watch(fetchedPatientInfo, (value) => {
  if (value) {
    formNode.value?.reset(value)
  }
})
</script>
