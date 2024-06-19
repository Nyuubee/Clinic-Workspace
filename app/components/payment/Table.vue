<template>
<table class="table">
        <!-- head -->
        <thead>
        <tr>
            <th></th>
            <th>Method</th>
            <th>Time</th>
            <th>Amount</th>
            <th>Transaction Number</th>
            <th>View</th>
        </tr>
        </thead>
        <tbody>
            <PaymentEntry v-for="payment in payments" :payment :selected="selectedItem?.id == payment.id"
            @select = "selectedItem = payment"
            @deselect = "selectedItem = undefined"
            />
        </tbody>
</table>
</template>
<script setup lang="ts">
import {type payment} from "~/server/database/schema"
defineProps<{
    payments: typeof payment.$inferSelect[]
}>()
const selectedItem = ref<typeof payment.$inferSelect>()
</script>
