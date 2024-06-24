<template>
    <div class="flex flex-col justify-center">
      <div role="tablist" class="tabs tabs-bordered">
        <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Upcoming" checked />
        <div role="tabpanel" class="tab-content p-10">
          <div class="overflow-x-auto">
            <table class="table">
              <!-- head -->
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" class="checkbox" />
                    </label>
                  </th>
                  <th>#</th>
                  <th>Name</th>
                  <th>Appointment Date</th>
                  <th>Purpose</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(appointment, index) in appointments" :key="appointment.id" class="bg-base-200">
                  <th>
                    <label>
                      <input type="checkbox" class="checkbox" />
                    </label>
                  </th>
                  <th>{{ index + 1 }}</th>
                  <td>{{ appointment.firstName }} {{ appointment.middleName }} {{ appointment.lastName }}</td>
                  <td>{{ new Date(appointment.appointmentDate).toLocaleDateString() }}</td>
                  <td>{{ appointment.purpose }}</td>
                  <td>{{ appointment.notes }}</td>
                </tr>
                <tr>
    <td></td>
    <td></td>
    <td>
    </td>
    <th>Actions:</th>
    <td>
        <button class="btn btn-error">
            <Icon name="material-symbols:delete-outline" class="text text-lg" />
            Delete</button>
    </td>
    <td>
        <!-- add -->
        <NuxtLink href="./add" class="btn btn-primary join-item">
            <Icon name="material-symbols:add" class="text text-lg" />
            Add</NuxtLink>
    </td>
</tr>
                
              </tbody>
            </table>
          </div>
        </div>
        <!-- Appointment request -->
        <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Appointment Requests" />
        <div role="tabpanel" class="tab-content p-10">
        </div>
        <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Completed" />
        <div role="tabpanel" class="tab-content p-10">Completed</div>
        <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Cancelled" />
        <div role="tabpanel" class="tab-content p-10">Cancelled</div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  
  interface Appointment {
    id: number
    firstName: string
    middleName: string
    lastName: string
    appointmentDate: string
    appointmentTime: string
    purpose: string
    notes: string
  }
  
  const appointments = ref<Appointment[]>([])
  
  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/appointments')
      if (!response.ok) {
        throw new Error('Failed to fetch appointments')
      }
      const data = await response.json()
      appointments.value = data
    } catch (error) {
      console.error('Error fetching appointments:', error)
    }
  }
  
  onMounted(() => {
    fetchAppointments()
  })
  </script>
  



