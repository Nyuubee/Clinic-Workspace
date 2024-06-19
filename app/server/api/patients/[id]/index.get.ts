import { and, eq } from "drizzle-orm"
import { db, tables } from "~/server/database"
import getRouteIntParam from "~/server/utils/getRouteParamInt"


/**
 * Patient.id => Patient
 */
export default eventHandler(async (event) => {
    const patientId = getRouteIntParam(event, 'id')
    const patient = await db.query.patient.findFirst({
        where: (patient, { eq }) => (eq(patient.id, patientId)),
    })
    return patient
})


