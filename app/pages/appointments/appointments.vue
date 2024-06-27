<template>
  <main>
    <div class="flex flex-col justify-center">
      <div class="tabs tabs-bordered" role="tablist">
        <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Upcoming" checked />
        <div role="tabpanel" class="tab-content p-10">
          <div class="overflow-x-auto">
            <div class="relative mb-4">
              <div class="input-group">
                <input
                  type="text"
                  placeholder="Search appointments"
                  v-model="searchQuery"
                  class="input input-bordered"
                />
                <button
                  v-if="searchQuery"
                  @click="clearSearch"
                  class="btn btn-square btn-ghost"
                >
                  <Icon name="material-symbols:close" class="text-lg" />
                </button>
              </div>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" class="checkbox" @change="selectAll" />
                    </label>
                  </th>
                  <th>#</th>
                  <th>Name</th>
                  <th>Appointment Date</th>
                  <th>Appointment Time</th>
                  <th>Purpose</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(appointment, index) in paginatedAppointments" :key="appointment.id" class="bg-base-200">
                  <th>
                    <label>
                      <input type="checkbox" class="checkbox" :value="appointment.id" @change="toggleSelection(appointment, $event)" />
                    </label>
                  </th>
                  <th>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</th>
                  <td>{{ appointment.firstName }} {{ appointment.middleName }} {{ appointment.lastName }}</td>
                  <td>{{ new Date(appointment.appointmentDate).toLocaleDateString() }}</td>
                  <td>{{ appointment.appointmentTime }}</td>
                  <td>{{ appointment.purpose }}</td>
                  <td>{{ appointment.notes }}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <th>Actions:</th>
                  <td>
                    <button
                      @click="navigateToUpdate"
                      class="btn btn-success join-item"
                      :class="{ 'btn-disabled': selectedAppointments.length !== 1 }"
                    >
                      <Icon name="material-symbols:edit" class="text text-lg" />
                      Update
                    </button>
                  </td>
                  <td>
                    <NuxtLink href="./add" class="btn btn-primary join-item">
                      <Icon name="material-symbols:add" class="text text-lg" />
                      Add
                    </NuxtLink>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="flex justify-between items-center mt-4">
              <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-secondary">
                Previous
              </button>
              <span>Page {{ currentPage }} of {{ totalPages }}</span>
              <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-secondary">
                Next
              </button>
            </div>
          </div>
        </div>
        <!-- Appointment request -->
        <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Appointment Requests" />
        <div role="tabpanel" class="tab-content p-10"></div>
        <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Completed" />
        <div role="tabpanel" class="tab-content p-10">Completed</div>
        <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Cancelled" />
        <div role="tabpanel" class="tab-content p-10">Cancelled</div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

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
const selectedAppointments = ref<Appointment[]>([])
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 5

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

const toggleSelection = (appointment: Appointment, event: Event) => {
  const checkbox = event.target as HTMLInputElement
  if (checkbox.checked) {
    selectedAppointments.value.push(appointment)
  } else {
    selectedAppointments.value = selectedAppointments.value.filter(app => app.id !== appointment.id)
  }
}

const selectAll = (event: Event) => {
  const checkbox = event.target as HTMLInputElement
  if (checkbox.checked) {
    selectedAppointments.value = [...appointments.value]
  } else {
    selectedAppointments.value = []
  }
}

const clearSearch = () => {
  searchQuery.value = ''
}

const filteredAppointments = computed(() => {
  return appointments.value.filter(appointment => {
    const searchTerm = searchQuery.value.toLowerCase()
    const fullName = `${appointment.firstName} ${appointment.middleName} ${appointment.lastName}`.toLowerCase()
    const appointmentDate = new Date(appointment.appointmentDate).toLocaleDateString().toLowerCase()
    
    return (
      appointment.id.toString().includes(searchTerm) ||
      fullName.includes(searchTerm) ||
      appointmentDate.includes(searchTerm)
    )
  })
})

const paginatedAppointments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredAppointments.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredAppointments.value.length / itemsPerPage)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const router = useRouter()

const navigateToUpdate = () => {
  if (selectedAppointments.value.length === 1) {
    const appointment = selectedAppointments.value[0]
    router.push({
      path: './update',
      query: {
        id: appointment.id,
        firstName: appointment.firstName,
        middleName: appointment.middleName,
        lastName: appointment.lastName,
        appointmentDate: appointment.appointmentDate,
        appointmentTime: appointment.appointmentTime,
        purpose: appointment.purpose,
        notes: appointment.notes
      }
    })
  }
}

onMounted(() => {
  fetchAppointments()
})
</script>
