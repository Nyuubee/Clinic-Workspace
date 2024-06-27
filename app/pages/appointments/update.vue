<template>
    <div class="flex flex-col items-center">
      <formkit>
        <div class="gap-y-4 gap-x-8 flex flex-col xl:flex-row">
          <!-- first name -->
          <FormKit type="text" label="First Name" name="firstName" v-model="formData.firstName" validation="required"/>
          <!-- middle name -->
          <FormKit type="text" label="Middle Name" name="middleName" v-model="formData.middleName" />
          <!-- last name -->
          <FormKit type="text" label="Last Name" name="lastName" v-model="formData.lastName" validation="required"/>
        </div>
  
        <div class="gap-y-4 gap-x-8 flex flex-col xl:flex-row">
          <!-- Appointment Date -->
          <FormKit type="date" label="Appointment Date" name="appointmentDate" v-model="formData.appointmentDate" validation="required"/>
          <!-- Time form -->
          <FormKit type="time" label="Time" name="appointmentTime" v-model="formData.appointmentTime" validation="required"/>
          <!-- Purpose form -->
          <FormKit type="text" label="Purpose" name="purpose" v-model="formData.purpose" validation="required"/>
        </div>
  
        <!-- Notes form -->
        <FormKit type="textarea" label="Notes" name="notes" v-model="formData.notes" placeholder="Write down notes." />
        <!-- Register button -->
        <FormKit type="submit" label="Update" @click="onSubmit" />
      </formkit>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  
  interface FormData {
    id: number
    firstName: string
    middleName: string
    lastName: string
    appointmentDate: string
    appointmentTime: string
    purpose: string
    notes: string
  }
  
  const route = useRoute()
  const formData = ref<FormData>({
    id: 0,
    firstName: '',
    middleName: '',
    lastName: '',
    appointmentDate: '',
    appointmentTime: '',
    purpose: '',
    notes: ''
  })
  
  onMounted(() => {
    const query = route.query
  
    formData.value = {
      id: Number(query.id),
      firstName: query.firstName as string,
      middleName: query.middleName as string,
      lastName: query.lastName as string,
      appointmentDate: query.appointmentDate as string,
      appointmentTime: query.appointmentTime as string,
      purpose: query.purpose as string,
      notes: query.notes as string
    }
  })
  
  const onSubmit = async (event: Event) => {
    event.preventDefault()
  
    try {
      const response = await fetch(`/api/appointments/${formData.value.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData.value)
      })
  
      if (!response.ok) {
        throw new Error('Failed to update appointment')
      }
  
      // Handle successful update, e.g., navigate back to the appointments page
      console.log('Appointment updated successfully')
    } catch (error) {
      console.error('Error updating appointment:', error)
    }
  }
  </script>
  