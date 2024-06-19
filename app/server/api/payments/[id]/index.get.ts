import getRouteIntParam from "~/server/utils/getRouteParamInt"
import { getTreatmentPaymentStatus } from "../index.get"
import { db, tables } from "~/server/database"
import { eq } from "drizzle-orm"

/**
 * Payment.id => Payment
 */
export default eventHandler(async (event) => {
    const paymentId = getRouteIntParam(event, 'id')
    const payment = await db.query.payment.findFirst({
        where: eq(tables.payment.id, paymentId)
    })
    return payment
    //const treatmentIdRaw = getRouterParam(event, 'id')
    //if (treatmentIdRaw === undefined) {
    //    throw createError({
    //        statusCode: 400,
    //        statusMessage: 'Missing id'
    //    })
    //}
    //const treatmentId = parseInt(treatmentIdRaw) || NaN
    //if (isNaN(treatmentId)) {
    //    throw createError({
    //        statusCode: 400,
    //        statusMessage: 'id must be a number'
    //    })
    //}
    //return getTreatmentPaymentStatus(treatmentId)
})
