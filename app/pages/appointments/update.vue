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
        <!-- Update button -->
        <FormKit type="submit" label="Update" @click="onSubmit" />
      </formkit>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import FormInput from './FormInput.vue';
  import FormDate from './FormDate.vue';
  import FormTime from './FormTime.vue';
  import FormTextarea from './FormTextarea.vue';
  import FormSubmit from './FormSubmit.vue';
  
  const router = useRouter();
  const route = useRoute();
  
  const formData = ref({
    firstName: '',
    middleName: '',
    lastName: '',
    appointmentDate: '',
    appointmentTime: '',
    purpose: '',
    notes: ''
  });
  
  const fetchAppointment = async (id: number) => {
    try {
      const response = await fetch(`/api/appointments/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch appointment');
      }
      const data = await response.json();
      formData.value = {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        appointmentDate: data.appointmentDate.split('T')[0],
        appointmentTime: data.appointmentTime,
        purpose: data.purpose,
        notes: data.notes
      };
    } catch (error) {
      console.error('Error fetching appointment:', error);
    }
  };
  
  onMounted(() => {
    const id = route.query.id;
    if (id) {
      fetchAppointment(Number(id));
    }
  });
  
  const onSubmit = async () => {
    const id = route.query.id;
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData.value),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update appointment');
      }
  
      const result = await response.json();
      console.log('Success:', result);
      router.push('/appointments'); // Navigate back to appointments page
    } catch (error) {
      console.error('Error:', error);
      // Handle error, show error message
    }
  };
  </script>
  