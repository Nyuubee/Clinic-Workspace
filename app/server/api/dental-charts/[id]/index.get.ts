import { db } from "~/server/database"
import getRouteIntParam from "~/server/utils/getRouteParamInt"
export default eventHandler(async (event) => {
    const dentalRecordId = getRouteIntParam(event, 'id')
    const dentalChart = await db.query.dentalChart.findFirst({
        where: (dentalChart, { eq }) => (eq(dentalChart.id, dentalRecordId)),
        with: {
            user: true,
            patient: true,
            intraoralExam: {
                columns:{
                    id: true,
                },
            },
            treatment: {
                columns: {
                    id: true,
                },
            },
        }
    })
    console.log(dentalChart)
    return dentalChart
})
