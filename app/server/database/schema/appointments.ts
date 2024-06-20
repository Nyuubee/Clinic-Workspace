import { serial, text, timestamp, pgTable, pgEnum, date as pgDate } from "drizzle-orm/pg-core";
import {  }

export const appointments = pgTable("appointments", {
    id: serial("id").primaryKey(),
    firstName: string("firstName").notNull(),
    middleName: string("middleName"),//optional
    lastName: string("lastName").notNull(),
    appointmentDate: Date("appointmentDate"),
    appointmentTime: string("appointmentTime").notNull(),
    purpose: string("purpose").notNull(),
    notes: string("notes")//optional
});