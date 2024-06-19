<template>
    <div class="flex flex-col items-center">

        <Head>
            <Title>
                Pay
            </Title>
        </Head>
        <template v-if="treatment">
            <div class="stats stats-vertical shadow">
                <div class="stat">
                    <div class="stat-title">Amount Charged:</div>
                    <div class="stat-value">₱ {{ treatment.amountChargedPesos }}</div>
                    <div class="stat-desc">on {{ treatment.createdAt }}</div>
                </div>
                <div class="stat" v-if="fullyPaid">
                    <div class="stat-title">Status</div>
                    <div class="stat-value text-success">Paid</div>
                </div>
                <!-- Balance -->
                <div class="stat" v-if="!fullyPaid">
                    <div class="stat-title">Balance</div>
                    <div class="stat-value text-error">₱ {{ treatment.balancePesos }}</div>
                </div>
            </div>
            <div>
                <h2 class="text-xl">Payment History</h2>
                <div class="stats stats-vertical shadow">
                    <div class="stat" v-for="payment in treatment.payments">
                        <div class="stat-title">Reference number: {{payment.id}}</div>
                        <div class="stat-value">₱ {{ payment.amountPaidCentavos / 100 }}</div>
                        <div class="stat-desc">on {{ payment.createdAt }}</div>
                    </div>
                </div>
            </div>
        </template>
        <FormKit type="form" @submit="onSubmit" v-if="treatment && !fullyPaid" :value="treatment">
            <div class="flex flex-row">
                <FormKit id="amountPaidPesos" name="amountPaidPesos" label="Pay amount:" type="number"
                    v-model="amountPaid" :validation="`required|max:${treatment.balancePesos}`"
                    validation-visibility="live" :max=treatment.balancePesos @submit="">
                    <!-- pay full formtype type button -->
                </FormKit>
                <FormKit type="hidden" name="id" id="id">

                </FormKit>
                <FormKit type="hidden" name="method" id="method" :value="'cash'">

                </FormKit>
                <FormKit type="button" @click="amountPaid = treatment.balancePesos">
                    Pay full
                </FormKit>
            </div>
            <!-- New balance -->
            New balance:
            {{
                treatment.balancePesos - amountPaid
            }}
        </FormKit>
    </div>
</template>
<script setup lang="ts">
import type { SubmitHandler } from "~/utils/formkit";
const route = useRoute("payments-id")
const { data: treatment,refresh } = useFetch(`/api/treatments/${route.params.id}`, {
    transform(data) {
        const treatment = data;
        if (treatment == undefined) {
            return undefined
        }
        const totalPaidCentavos = sum(treatment.payments, "amountPaidCentavos");

        const balanceCentavos = treatment.amountChargedCentavos - totalPaidCentavos;
        return {
            ...treatment,
            totalPaidPesos: totalPaidCentavos / 100,
            amountChargedPesos: treatment.amountChargedCentavos / 100,
            totalPaidCentavos,
            balanceCentavos,
            balancePesos: balanceCentavos / 100,
        }
    }
})

const amountPaid = ref(0)
const fullyPaid = computed(() => {
    if (treatment.value == undefined) {
        return false
    }
    return treatment.value.balanceCentavos == 0
})
watch(amountPaid, (value) => {
    if (treatment.value == undefined) {
        return
    }
    if (value > treatment.value.balancePesos) {
        amountPaid.value = treatment.value.balancePesos
    }
})

const headers = useRequestHeaders(['cookie']) as HeadersInit
const onSubmit: SubmitHandler<{
    amountPaidPesos: number,
    id: number,
    method: 'cash',
}> = async (value, node) => {
    console.log(value)
    const response = await $fetch(`/api/payments`, {
        method: "POST",
        headers,
        body: {
            amountPaidCentavos: value.amountPaidPesos * 100,
            treatmentId: value.id,
            method: value.method,
        },
    })
    await refresh()
}
</script>
