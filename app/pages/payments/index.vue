<template>
<main class="flex flex-col w-full justify-center items-center">
    <div class="text-2xl">
        Earnings:
    </div>
    <div class="w-full">
    <Stats 
        :daily="2_000.00"
        :weekly="20_000.00"
        :monthly="60_000.00"
        label_daily="Today"
        label_weekly="This Week"
        label_monthly="This Month"
        prefix="Php"
    />
    </div>
    <div class="text-2xl">
        Recent Transactions:
    </div>
    <!-- table form -->
    <div class="overflow-x-auto w-full mb-4">
        <PaymentTable :payments="payments" />
    </div>
    <div class="flex w-full justify-between">
        <div>
            &nbsp;
        </div>
        <div class="join self-center">
            <button class="join-item btn btn-disabled" :class="{'btn-ghost': canPrev}">
                <Icon name="material-symbols:arrow-left" class="h-12 w-12" />
                </button>
            <Fraction class="btn join-item" :numerator="page.displayedNumber" :denominator="max" />
                <button class="join-item btn btn-disabled " :class="{'btn-ghost': canNext}">
                <Icon name="material-symbols:arrow-right" class="h-12 w-12" />
            </button>
        </div>
    </div>
</main>
</template>
<script setup lang="ts">
import { usePagination } from '~/composables/usePagination';
const {data:payments} = useFetch("/api/payments")
const {data:recordsCount} = useAsyncData(()  => $fetch("/api/payments/count"), {
    default() {
        return {
            count: 0
        }
    },
})
const {page,max,canNext, canPrev} = usePagination(recordsCount, 10)
</script>
