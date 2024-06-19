import {getToken}  from "#auth";
import { db, tables } from "~/server/database";
import { desc } from "drizzle-orm";
export default eventHandler(async (event) => {
    const token = (await getToken({event}))!
    const { limit = 10, offset = 0 } = getQuery<{
        limit: number
        offset: number,
      }>(event)
    const dentalCharts = await db.query.dentalChart.findMany({
        columns: {
            id: true,
            updatedAt: true,
            createdAt: true,
        },
        orderBy: [desc(tables.dentalChart.updatedAt)],
        limit,
        offset,
        with: {
            patient: {
                columns: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    middleName: true,
                },
            },
            intraoralExam: {
                columns: {
                    id:true
                }
            },
            treatment: {
                columns: {
                    id:true,
                    procedure:true,
                    updatedAt:true,
                    createdAt: true,
                }
            }
        },
    })
    return dentalCharts
})
