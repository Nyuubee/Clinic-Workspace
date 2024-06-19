<template>
  <NuxtLayout name="default">
    <template #navbar-start>
      <span class="text-lg">INTRAORAL EXAM<span class="hidden lg:inline">INATION</span>
      </span>
    </template>
    <template #navbar-center>
      <PeriTeethVisibilityDropdown v-model="visiblePart" />
    </template>
    <template #navbar-end>
      <!-- save changes -->
      <button class="btn btn-sm
      btn-primary" @click="form?.submit()">
        <icon name="material-symbols:save" class="text text-lg"></icon>
        Submit
      </button>
    </template>
    <dialog id="toothEditor" class="modal max-w-[100vw]" ref="toothEditor">
      <ToothDialogContent @close="closeModal" @save="closeModal">
        <ToothEditor :tooth="selectedTooth" />
      </ToothDialogContent>
    </dialog>
    <main class="flex flex-col gap-2 gap-y-8">
      <PeriPatientInfo v-if="dentalChart" :patientInfo="dentalChart.patient" />
      <peri-mouth-model :mouth :visible-part @tooth-click="router.push({
        query: {
          toothId: $event,
        }
      })" />
      <FormKit type="form" name="intraoralExam" :id="FORM_ID" @submit="onSubmit" :actions="false" useLocalStorage>
        <FormKitSchema :schema="intraoralExamSchema">

        </FormKitSchema>
      </FormKit>
    </main>
  </NuxtLayout>
</template>
<script setup lang="ts">
import PeriPatientInfo from '~/components/records/PeriPatientInfo.vue';
import type { TeethPartVisibility } from '~/utils/peri';
import { mouth } from '~/utils/peri';
import { TMD_OPTIONS, PERIODENTAL_SCREENING_OPTIONS, useIntraoralExamSchema, type IntraoralExam, APPLIANCES_OPTIONS } from '~/utils/records/intraoralExam';
import { type FormKitNode } from "@formkit/core"
import { listToBoolRecordWithBasis } from '~/utils/BoolRecord';
import { useFormKitNodeById } from "@formkit/vue"
import ToothEditor from '~/components/peri/ToothEditor.vue';
import ToothDialogContent from '~/components/peri/ToothDialogContent.vue';
const visiblePart = useLocalStorage<TeethPartVisibility>("intraoral-exam-visibility", 'all');

const router = useRouter()
const { schema: intraoralExamSchema } = useIntraoralExamSchema()

// Override layout to add the dental chart progression
definePageMeta({
  layout: false,
})
const FORM_ID = 'intraoralExam'
const form = useFormKitNodeById('intraoralExam')
const route = useRoute("dental-chart-id-intraoral-exam")
const {closeModal,selectedTooth,toothEditor} = useToothFromUrl("dental-chart-id-intraoral-exam")

const { data: dentalChart } = useFetch(`/api/dental-charts/${route.params.id}`)

watch(dentalChart, (newValue) => {
  console.log(newValue)
  if (newValue?.intraoralExam?.id) {
    router.push({
      path: `/dental-chart/${route.params.id}/intraoral-exam/${newValue.intraoralExam.id}`,
    })
  }
})
const headers = useRequestHeaders(['cookie']) as HeadersInit

async function onSubmit(data: IntraoralExam, node: FormKitNode) {
  if (dentalChart.value == undefined || dentalChart.value == null) {
    throw Error('Dental chart not found')
  }
  console.log(data)

  console.log(mouth.value.byId)
  const simplifiedMouth = mouth.value.simplify()

  const response = await $fetch('/api/intraoral-exams', {
    method: 'POST',
    headers,
    body: {
      dentalChart: {
        id: dentalChart.value.id
      },
      toothConditions: simplifiedMouth,
      ...data,
      TMD: listToBoolRecordWithBasis(TMD_OPTIONS, data.TMD),
      periodentalScreening: listToBoolRecordWithBasis(PERIODENTAL_SCREENING_OPTIONS, data.periodentalScreening),
      appliances: listToBoolRecordWithBasis(APPLIANCES_OPTIONS, data.appliances),
      otherAppliances: data.otherAppliances
    }
  })
}

</script>
