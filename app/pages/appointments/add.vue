<template>
  <div class="flex flex-col items-center">
    <form @submit.prevent="onSubmit">
      <div class="gap-y-4 gap-x-8 flex flex-col xl:flex-row">
        <FormKit type="text" label="First Name" name="firstName" v-model="formData.firstName" validation="required"/>
        <FormKit type="text" label="Middle Name" name="middleName" v-model="formData.middleName" />
        <FormKit type="text" label="Last Name" name="lastName" v-model="formData.lastName" validation="required"/>
      </div>
      <div class="gap-y-4 gap-x-8 flex flex-col xl:flex-row">
        <FormKit type="date" label="Appointment Date" name="appointmentDate" v-model="formData.appointmentDate" validation="required"/>
        <FormKit type="time" label="Time" name="appointmentTime" v-model="formData.appointmentTime" validation="required"/>
        <FormKit type="text" label="Purpose" name="purpose" v-model="formData.purpose" validation="required"/>
      </div>
      <FormKit type="textarea" label="Notes" name="notes" v-model="formData.notes" placeholder="Write down notes." />
      <FormKit type="submit" label="Register" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const formData = ref({
  firstName: '',
  middleName: '',
  lastName: '',
  appointmentDate: '',
  appointmentTime: '',
  purpose: '',
  notes: ''
})

const route = useRoute()

onMounted(() => {
  const { data } = route.query
  if (data) {
    const appointment = JSON.parse(data as string)
    formData.value = {
      firstName: appointment.firstName,
      middleName: appointment.middleName,
      lastName: appointment.lastName,
      appointmentDate: appointment.appointmentDate,
      appointmentTime: appointment.appointmentTime,
      purpose: appointment.purpose,
      notes: appointment.notes
    }
  }
})

const onSubmit = async () => {
  try {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value),
    })

    if (!response.ok) {
      throw new Error('Failed to submit form')
    }

    const result = await response.json()
    console.log('Success:', result)
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>
