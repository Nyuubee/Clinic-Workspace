<template>
  <div class="flex flex-col items-center">
    <formkit>
      <div class="gap-y-4 gap-x-8 flex flex-col xl:flex-row">
        <!-- first name -->
        <FormKit type="text" label="First Name" name="firstName" v-model="formData.firstName" validation="required" />
        <!-- middle name -->
        <FormKit type="text" label="Middle Name" name="middleName" v-model="formData.middleName" />
        <!-- last name -->
        <FormKit type="text" label="Last Name" name="lastName" v-model="formData.lastName" validation="required" />
      </div>

      <div class="gap-y-4 gap-x-8 flex flex-col xl:flex-row">
        <!-- Appointment Date -->
        <FormKit type="date" label="Appointment Date" name="appointmentDate" v-model="formData.appointmentDate" validation="required" />
        <!-- Time form -->
        <FormKit type="time" label="Time" name="appointmentTime" v-model="formData.appointmentTime" validation="required" />
        <!-- Purpose form -->
        <FormKit type="text" label="Purpose" name="purpose" v-model="formData.purpose" validation="required" />
      </div>

      <!-- Notes form -->
      <FormKit type="textarea" label="Notes" name="notes" v-model="formData.notes" placeholder="Write down notes." />

      <!-- Register button -->
      <div class="mt-4">
        <button :disabled="isSubmitted" type="submit" @click="onSubmit" class="btn btn-primary">
          <Icon name="material-symbols:add" class="text text-lg" />
          {{ isSubmitted ? 'Registered!' : 'Register' }}
        </button>
      </div>
    </formkit>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FormInput from './FormInput.vue';
import FormDate from './FormDate.vue';
import FormTime from './FormTime.vue';
import FormTextarea from './FormTextarea.vue';
import FormSubmit from './FormSubmit.vue';

const formData = ref({
  firstName: '',
  middleName: '',
  lastName: '',
  appointmentDate: '',
  appointmentTime: '',
  purpose: '',
  notes: ''
});

const isSubmitted = ref(false);

const onSubmit = async (event: Event) => {
  event.preventDefault();
  
  try {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value),
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    const result = await response.json();
    console.log('Success:', result);
    isSubmitted.value = true; // Change button text and disable button
    // Navigate to another page or show success message
  } catch (error) {
    console.error('Error:', error);
    // Handle error, show error message
  }
}
</script>
