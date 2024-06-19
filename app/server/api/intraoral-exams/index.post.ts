import { db, tables } from "~/server/database"
import { getToken } from '#auth'
import { and, eq } from "drizzle-orm"
import { type OmitIdAndTimestamps } from "~/utils/types"
import { type TMDOptions, type PeriodentalScreeningOptions } from "~/utils/records/intraoralExam"

interface IntraoralExam {
    dentalChart: {
        id: number
    }
    toothConditions: Omit<OmitIdAndTimestamps<typeof tables.toothCondition.$inferSelect>, 'intraoralExamId'>[]
    TMD: Record<TMDOptions, boolean>
    xrayTaken: OmitIdAndTimestamps<typeof tables.xrayTaken.$inferSelect>
    periodentalScreening: Record<PeriodentalScreeningOptions, boolean>
    appliances: OmitIdAndTimestamps<typeof tables.appliances.$inferSelect>
    otherAppliances: string
    occlusion: OmitIdAndTimestamps<typeof tables.occlusion.$inferSelect>
}

export default eventHandler(async (event) => {
    const body = await readBody<IntraoralExam>(event)
    const token = (await getToken({ event }))!
    console.log('token', token)
    console.log('body', body)
    if (token == null) {
        throw createError({
            statusMessage: 'You must be logged in to create a dental record.',
            status: 401,
        });
    }

    // check if doctorId has a doctor role
    const doctor = await db.query.userRole.findFirst({
        where(fields, {inArray,eq, and}) {
            return and(
                eq(fields.userId, token.id),
                eq(fields.role, 'doctor'),
            )
        },
        columns: {
            id: true,
        }
    })

    if (doctor){
        throw createError({
            message: 'You must be a doctor to create a dental record.',
            status: 401,
        });
    }

    const result = await db.transaction(async (tx) => {
        const tmd = await tx.insert(tables.TMD).values(body.TMD).returning({ id: tables.TMD.id }).then(takeUniqueOrThrow)
        const xrayTaken = await tx.insert(tables.xrayTaken).values(body.xrayTaken).returning({ id: tables.xrayTaken.id }).then(takeUniqueOrThrow)
        const periodentalScreening = await tx.insert(tables.periodentalScreening).values(body.periodentalScreening).returning({ id: tables.periodentalScreening.id }).then(takeUniqueOrThrow)
        const appliances = await tx.insert(tables.appliances).values({
            orthodontic: body.appliances.orthodontic,
            stayplate: body.appliances.stayplate,
            others: body.appliances.others ? body.otherAppliances : '',
        }).returning({ id: tables.appliances.id }).then(takeUniqueOrThrow)

        const occlusion = await tx.insert(tables.occlusion).values(body.occlusion).returning({ id: tables.occlusion.id }).then(takeUniqueOrThrow)
        const intraoralExam = await tx.insert(tables.intraoralExam).values({
            dentalChartId: body.dentalChart.id,
            periodentalScreeningId: periodentalScreening.id,
            occlusionId: occlusion.id,
            appliancesId: appliances.id,
            TMDId: tmd.id,
            xrayTakenId: xrayTaken.id,
        }).returning({ id: tables.intraoralExam.id }).then(takeUniqueOrThrow)

        // Insert the tooth conditions last
        const withIntraoralExam = body.toothConditions.map(
            toothCondition => ({ intraoralExamId: intraoralExam.id, ...toothCondition, }))
        const toothConditions = await tx.insert(tables.toothCondition)
            .values(withIntraoralExam).returning({ id: tables.toothCondition.id })

        return {
            intraoralExam,
            toothConditions,
            xrayTaken,
            periodentalScreening,
            appliances,
            occlusion,
        }
    })

    return result
})
