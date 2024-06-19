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
                Save changes
            </button>
        </template>
        <template #dental-record>
            <li>
                <RecordsDentalChartLink />
            </li>
            <li>
                <RecordsExamLink :intraoralExamID="$route.params.exam_id" />
            </li>
            <li>
                <RecordsTreatmentLink />
            </li>
        </template>
        <dialog id="toothEditor" class="modal max-w-[100vw]" ref="toothEditor">
            <ToothDialogContent @close="closeModal" @save="closeModal">
                <ToothEditor :tooth="selectedTooth" />
            </ToothDialogContent>
        </dialog>
        <main class="flex flex-col gap-2 gap-y-8">
            <PeriPatientInfo v-if="data" :patientInfo="data.patient" />
            <peri-mouth-model v-if="mouth" :mouth :visible-part @tooth-click="router.push({
                query: {
                    toothId: $event,
                }
            })" />
            <FormKit v-if="data" type="form" name="intraoralExam" :id=FORM_ID @submit="onSubmit" :actions="false"
                :value="data.intraoralExam">
                <FormKitSchema :schema="intraoralExamSchema">

                </FormKitSchema>
            </FormKit>
        </main>
    </NuxtLayout>
</template>
<script setup lang="ts">
import PeriPatientInfo from '~/components/records/PeriPatientInfo.vue';
import type { TeethPartVisibility } from '~/utils/peri';
import { PERIODENTAL_SCREENING_OPTIONS, TMD_OPTIONS, APPLIANCES_OPTIONS, useIntraoralExamSchema, type IntraoralExam, OCCLUSION_OPTIONS } from '~/utils/records/intraoralExam';
import ToothEditor from '~/components/peri/ToothEditor.vue';
import { type FormKitNode } from "@formkit/core"
import { useFormKitNodeById } from "@formkit/vue"
import { Mouth } from '~/utils/peri/Mouth';
import { mouth } from '~/utils/peri';
import ToothDialogContent from '~/components/peri/ToothDialogContent.vue';
import type { SimplifiedTooth } from '~/utils/peri/Tooth';

const visiblePart = useLocalStorage<TeethPartVisibility>("intraoral-exam-visibility", 'all');

const router = useRouter()
const { schema: intraoralExamSchema } = useIntraoralExamSchema()
// Override layout to add the dental chart progression
definePageMeta({
    layout: false,
})

const FORM_ID = 'intraoralExam'
const form = useFormKitNodeById(FORM_ID)
const route = useRoute('dental-chart-id-intraoral-exam-exam_id')
const {closeModal,selectedTooth,toothEditor} = useToothFromUrl("dental-chart-id-intraoral-exam")

const { data } = useAsyncData(() => $fetch(`/api/intraoral-exams/${route.params.exam_id}`), {
    transform({ intraoralExam, toothConditions }) {
        console.log(intraoralExam.appliances)
        return {
            toothConditions,
            patient: intraoralExam.dentalChart.patient,
            original: {
                intraoralExam,
            },
            intraoralExam: {
                TMD: boolRecordWithBasisToList(TMD_OPTIONS, intraoralExam.TMD),
                periodentalScreening: boolRecordWithBasisToList(PERIODENTAL_SCREENING_OPTIONS, intraoralExam.periodentalScreening),
                appliances: boolRecordWithBasisToList(APPLIANCES_OPTIONS, intraoralExam.appliances),
                xrayTaken: intraoralExam.xrayTaken,
                occlusion: {
                    ...intraoralExam.occlusion,
                    molarClass: intraoralExam.occlusion.molarClass,
                    occlusion: boolRecordWithBasisToList(OCCLUSION_OPTIONS, intraoralExam.occlusion),
                },
                otherAppliances: intraoralExam.appliances.others,
            },
            toothIds: toothConditions.map(({ id }) => id),
        }
    },
})
onMounted(() => {
    if (data.value) {
        mouth.value = Mouth.fromSimplified(data.value.toothConditions)
        form.value?.reset(data.value.intraoralExam)
    }
})
watch(data, data => {
    if (data) {
        mouth.value = Mouth.fromSimplified(data.toothConditions)
        form.value?.reset(data.intraoralExam)
    }
})

const headers = useRequestHeaders(['cookie']) as HeadersInit

function prepRestoreExtraFields<T extends SimplifiedTooth>(basis: T[]) {
    console.log(basis)
    return (tooth: SimplifiedTooth): T | undefined => {
        console.log("target", tooth)
        const remoteVer = basis.find(remoteVer => {
            return remoteVer.toothId == tooth.toothId
        })
        console.log(remoteVer)
        if (remoteVer) {
            return {
                ...remoteVer, // copy all the extra fields
                ...tooth, // then overwrite with the new values
            }
        }
    }
}

async function onSubmit(exam: IntraoralExam, node: FormKitNode) {
    console.log(data.value)
    if (data.value == null) {
        throw Error('Data is not loaded')
    }
    if (mouth.value == null) {
        throw Error('Mouth is not loaded')
    }
    const restoreExtraFields = prepRestoreExtraFields(data.value.toothConditions)
    const toothConditions = mouth.value.simplify().map(t => {
        const restored = restoreExtraFields(t)
        if (restored) {
            return restored
        }
        return t // keep the new ones
    });
    console.log(data.value.toothConditions, toothConditions)
    console.log("orig TMD", data.value.TMD)
    const response = await $fetch(`/api/intraoral-exams/${route.params.exam_id}`, {
        method: 'PATCH',
        headers,
        body: {
            ...exam,
            toothConditions,
            TMD: {
                ...data.value.original.intraoralExam.TMD,
                ...listToBoolRecordWithBasis(TMD_OPTIONS, exam.TMD),
            },
            periodentalScreening: {
                ...data.value.original.intraoralExam.periodentalScreening,
                ...listToBoolRecordWithBasis(PERIODENTAL_SCREENING_OPTIONS, exam.periodentalScreening),
            },
            appliances: {
                ...data.value.original.intraoralExam.appliances,
                ...listToBoolRecordWithBasis(APPLIANCES_OPTIONS, exam.appliances),
                others: exam.otherAppliances,
            },
            xrayTaken: {
                ...data.value.original.intraoralExam.xrayTaken,
                ...exam.xrayTaken,
            },
            occlusion: {
                ...data.value.original.intraoralExam.occlusion,
                ...listToBoolRecordWithBasis(OCCLUSION_OPTIONS, exam.occlusion.occlusion),
            },
        }
    })
}



</script>
