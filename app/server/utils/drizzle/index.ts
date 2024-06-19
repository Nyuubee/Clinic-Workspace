import { DrizzleError, count } from "drizzle-orm";
import { PgColumn } from "drizzle-orm/pg-core";
import { db, tables } from "~/server/database";

export const ERROR = Object.freeze({
    UNIQUE_CONSTRAINT: "23505"
})

/**
 * statusCode defaults to 409 unless specified
 */
export function onUniqueConstraintError(options: Exclude<Parameters<typeof createError>[0], string>) {
    return (error: any) => {
        console.log(typeof error)
        if (error.code == ERROR.UNIQUE_CONSTRAINT) {
            throw createError({
                statusCode: 409,
                ...options,
            })
        }
        // else, throw it again
        throw error;
    }
}
export const Count = {
    nullable<T>(pgColumn: PgColumn<T>) {
        return db
            .select({
                count: count(),
            })
            .from(pgColumn.table)
    },
    nonNullable<T>(pgColumn: PgColumn<T>) {
        return db
            .select({
                count: count(pgColumn),
            })
            .from(pgColumn.table)
    },
}
