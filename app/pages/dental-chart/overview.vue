<template>
  <main class="p-2">
    <div>
      <div class="join">
          <NuxtLink to="/dental-chart" class="join-item btn btn-primary btn-sm">
            <Icon name="material-symbols:add" class="text text-lg" />
            New Patient
          </NuxtLink>
        <!-- <NuxtLink :to="{
          path: '/dental-chart',
          query: { patientId: selectedDentalChart?.patient.id }
        }" class="join-item btn btn-sm" :class="{ 'btn-disabled': !selectedDentalChart }">
          <Icon name="material-symbols:add" class="text text-lg" />
          New Record
        </NuxtLink> -->
        <!-- Edit Record -->
        <template v-if="selectedDentalChart">
          <!-- View Dental Chart -->
          <NuxtLink :to="{
            path: `/dental-chart/${selectedDentalChart.id}`,
          }" class="join-item btn btn-sm">
            <Icon name="material-symbols:edit" class="text text-lg" />
            View Dental Chart
          </NuxtLink>
          <!-- View intraoral exam -->
          <NuxtLink :to="{
            path: `/dental-chart/${selectedDentalChart.id}/intraoral-exam/${selectedDentalChart.intraoralExam?.id}`,
          }" class="join-item btn btn-sm"
            :class="{ 'btn-disabled': !selectedDentalChart?.intraoralExam }"
          >
            <Icon name="material-symbols:edit" class="text text-lg" />
            View Intraoral Exam
          </NuxtLink>
          <!-- Make intraoral Exam -->
          <NuxtLink :to="{
            path: `/dental-chart/${selectedDentalChart.id}/intraoral-exam`,
            query: { dentalChartId: selectedDentalChart.id }
          }" class="join-item btn btn-sm"
            :class="{ 'btn-disabled': selectedDentalChart?.intraoralExam }"
          >
            <Icon name="material-symbols:edit" class="text text-lg" />
            Make Intraoral Exam
          </NuxtLink>
          <!-- Treatment record -->
          <NuxtLink :to="{
            path: `/dental-chart/${selectedDentalChart.id}/treatment-record`,
          }" class="join-item btn btn-sm">
            <Icon name="material-symbols:edit" class="text text-lg" />
            Treatment Record
          </NuxtLink>
          <!-- Deselect -->
          <button class="join-item btn btn-error btn-sm" @click="deselect()">
            <Icon name="material-symbols:close" class="text text-lg" />
            Deselect
          </button>
        </template>
        <template v-else>
          <button class="join-item btn btn-sm btn-disabled">
            <Icon name="material-symbols:edit" class="text text-lg" />
            View Dental Chart
          </button>
          <button class="join-item btn btn-sm btn-disabled">
            <Icon name="material-symbols:edit" class="text text-lg" />
            View Intraoral Exam
          </button>
          <button class="join-item btn btn-sm btn-disabled">
            <Icon name="material-symbols:edit" class="text text-lg" />
            Make Intraoral Exam
          </button>
          <button class="join-item btn btn-sm btn-disabled">
            <Icon name="material-symbols:edit" class="text text-lg" />
            Treatment Record
          </button>
          <button class="join-item btn btn-sm btn-disabled">
            <Icon name="material-symbols:close" class="text text-lg" />
            Deselect
          </button>
        </template>
      </div>
    </div>
    <h1>Recent records accessed</h1>

    <table class="table">
      <thead>
        <!-- name, date, procedure -->
        <tr>
          <th></th>
          <th>Name</th>
          <th>Date</th>
          <th>Procedure</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="record of patientRecords">
          <RecordsDentalChartEntry  class="hover cursor-pointer"
            :class="{ 'bg-base-200': record.id == selectedDentalChart?.id }"
            :treatment="record.treatment"
          :fullName="record.fullName" :date="record.date" :selected="record.id == selectedDentalChart?.id" @select="toggle(record)" @deselect="deselect"
            />
        </template>
      </tbody>
    </table>
  </main>
</template>
<script setup lang="ts">
import { fullName } from '~/utils/records/PatientInfo';

const dayjs = useDayjs()
// example: May 31, 2024
const DATE_FORMAT = 'MMMM DD, YYYY'
const { data: patientRecords, execute: fetchPatientRecords } = useAsyncData(
  () => $fetch("/api/dental-charts"),
  {
    transform(data) {
      console.log(data)
      return data.map((record) => {
        return {
          ...record,
          fullName: fullName(record.patient),
          date: dayjs(record.updatedAt).format(DATE_FORMAT),
          treatment: record.treatment.map(t => ({
            createdAt: dayjs(t.createdAt).format(DATE_FORMAT),
            procedure: t.procedure,
          }))
        }
      })
    }
  })

const { selected: selectedDentalChart, toggle, deselect } = useRowSelect<Flatten<NonNullable<typeof patientRecords.value>>, number>()

</script>
