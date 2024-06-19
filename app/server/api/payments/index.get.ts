import { count, eq, sum } from "drizzle-orm";
import { db, tables } from "~/server/database";
export async function getTreatmentPaymentStatus(treatmentId: number) {
    // TODO: optimize into a union of subqueries
    const sqAmountCharged = await db.select({
        amountChargedCentavos: tables.treatment.amountChargedCentavos
    }).from(tables.treatment)
        .where(eq(tables.treatment.id, treatmentId))

    const sqTotalPaid = await db.select({
        totalPaidCentavos: sum(tables.payment.amountPaidCentavos)
            .mapWith(Number).as('totalPaidCentavos'),
        numberOfPayments: count(tables.payment.id).as('numberOfPayments')
    }).from(tables.payment)
        .where(eq(tables.payment.treatmentId, treatmentId))

    const amountChargedCentavos = sqAmountCharged[0].amountChargedCentavos
    const totalPaidCentavos = sqTotalPaid[0].totalPaidCentavos
    const numberOfPayments = sqTotalPaid[0].numberOfPayments
    return {
        amountChargedCentavos,
        totalPaidCentavos,
        numberOfPayments,
    }
}

export default eventHandler(async() => {
    // handle GET requests for the `/payments` endpoint
    const payments = await db.select()
        .from(tables.payment)
    return payments
})
