import { serial, text, timestamp, pgTable, pgEnum, date as pgDate } from "drizzle-orm/pg-core";

export const appointments = pgTable("appointments", {
    id: serial("id").primaryKey(),
    firstName: text("firstName").notNull(),
    middleName: text("middleName"),//optional
    lastName: text("lastName").notNull(),
    appointmentDate: pgDate("appointmentDate"),
    appointmentTime: text("appointmentTime").notNull(),
    purpose: text("purpose").notNull(),
    notes: text("notes")//optional
});