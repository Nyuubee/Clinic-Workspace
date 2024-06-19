import { count, eq } from "drizzle-orm";
import { db, tables } from "~/server/database";
import { Count } from "~/server/utils/drizzle";
// counts the number of messages for a user
export default eventHandler(async (event) => {
    const result = await Count.nonNullable(tables.payment.id).then(takeUniqueOrThrow)
    return result
})
