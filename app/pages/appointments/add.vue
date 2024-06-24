<template>
    <div class="flex flex-col items-center">
      <FormKit type="form" id="registration-example"

      submit-label="Register"
      @submit="onSubmit"

      >
      <div class="gap-y-4 gap-x-8 flex flex-col xl:flex-row" > 
      <!-- first name -->
      <FormKit type="text" label="First Name" name="firstName" validation="required">
      </FormKit>
      <!-- middle name -->
      <FormKit type="text" label="Middle Name" name="middleName">
      </FormKit>
      <!-- last name -->
      <FormKit type="text" label="Last Name" name="lastName" validation="required">
      </FormKit>
      </div>

      <div class="gap-y-4 gap-x-8 flex flex-col xl:flex-row" > 
        <!-- Appointment Date -->
      <FormKit type="date" label="Appointment Date" name="appointmentDate" placeholder="YYYY-MM-DD" validation="required"/>

        <!-- Time form -->
      <FormKit type="time" label="Time" name="appointmentTime" validation="required"/>

        <!-- Purpose form -->
      <FormKit type="text" label="Purpose" name="purpose" validation="required">
      </FormKit>
      </div>

        <!-- Notes form -->
      <FormKit type="textarea" label="Notes" name="notes" placeholder="Write down notes."/>

        <!-- Register button -->
      <FormKit type="submit" label="Register" prefix-icon="check"/>
    </FormKit>
    </div>
    
    
</template>
<script setup lang="ts">
import { appointments } from "~/server/database/schema";
import type { SubmitHandler } from "~/utils/formkit";
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const onSubmit = async (formData) => {
  try {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error('Failed to submit form')
    }

    const result = await response.json()
    console.log('Success:', result)
    // Navigate to another page or show success message
  } catch (error) {
    console.error('Error:', error)
    // Handle error, show error message
  }
}
</script>


<style>

</style>