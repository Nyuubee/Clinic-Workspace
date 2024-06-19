import { db, tables } from "~/server/database"
import getRouteIntParam from "~/server/utils/getRouteParamInt"

export default eventHandler(async (event) => {
    const intraoralExamId = getRouteIntParam(event, 'id')
    const intraoralExam = await db.query.intraoralExam.findFirst({
        where: (intraoralExam, { eq }) => (eq(intraoralExam.id, intraoralExamId)),
        columns: {
            id: true,
            createdAt: true,
            updatedAt: true,
        },
        with: {
            appliances: true,
            occlusion: true,
            periodentalScreening: true,
            TMD: true,
            xrayTaken: true,
            dentalChart: {
                columns: {
                    id:true,
                },
                with: {
                    patient: true
                }
            }
        }
    })
    if (intraoralExam == null) {
        throw createError({
            status: 404,
            message: 'Intraoral exam not found',
        })
    }
    
    const toothConditions = await db.query.toothCondition.findMany({
        where: (toothCondition, { eq }) => (
            eq(toothCondition.intraoralExamId, intraoralExamId)
        )
    })
    return {intraoralExam, toothConditions}
})
