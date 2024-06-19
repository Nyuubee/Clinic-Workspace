<template>
    <tr class="" :class="selectedClass" @click="selected ? $emit('deselect') : $emit('select', payment)">
        <th>
            <label>
                <input type="checkbox" class="checkbox" :checked="selected" />
            </label>
        </th>
        <td>{{ payment.method }}</td>
        <td>{{ paymentTime }}</td>
        <td>Php {{ paidPesos }}</td>
        <td>{{ payment.id }}</td>
        <td><NuxtLink :to="`/payments/${payment.treatmentId}`">
           View payment
        </NuxtLink>
        </td>
    </tr>
</template>
<script setup lang="ts">
import { type payment } from "~/server/database/schema"
const props= defineProps<{
    payment: typeof payment.$inferSelect,
    selected: boolean
}>()
const dayjs = useDayjs()
// Example: "January 1, 2022 12:00 AM"
const TIME_FORMAT= "MMMM D, YYYY h:mm A"
const paymentTime = computed(() => dayjs(props.payment.createdAt).format(TIME_FORMAT))
const paidPesos = computed(() => props.payment.amountPaidCentavos / 100)
defineEmits<{
    select: [payment: typeof payment.$inferSelect]
    deselect: []
}>()
const selectedClass = computed(() => props.selected ? 'bg-base-200' : '')
</script>
