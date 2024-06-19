import { eq } from "drizzle-orm"
import { db, tables } from "~/server/database"
import getRouteIntParam from "~/server/utils/getRouteParamInt"

/**
 * treatment.id => Payment[]
 */
export default eventHandler(async (event) => {
    const id = getRouteIntParam(event, 'id')
    const payments = await db.select()
        .from(tables.payment)
        .where(eq(tables.payment.treatmentId, id))
    return payments
})


