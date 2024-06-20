<template>
    <div class="flex flex-col items-center">
      <FormKit type="form" id="registration-example"
      :form-class="submitted ? 'hide' : 'show'"
      submit-label="Register"
      @submit="onSubmit"
      :actions="false"
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
import type { SubmitHandler } from "~/utils/formkit";

const onSubmit: SubmitHandler<{
  firstName:string,
  middleName:string,
  lastName:string,
  appointmentDate:Date,
  appointmentTime:string,
  purpose:string,
  notes:string

}> = async (value, node) => {
  console.log(value)
  const response = await $fetch('/api/appointments', {
    method: "POST",
    body:value
  })

}
</script>


<style>

</style>