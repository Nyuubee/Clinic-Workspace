/**
 * Any user of the system, regardles of whether they can directly (actually login) use it or not.
 * Back in the ERD, this is the person table
 */

import { relations } from "drizzle-orm";
import { serial, text, timestamp, pgTable, pgEnum, date as pgDate } from "drizzle-orm/pg-core";
import { auth } from "./auth";
export const UserRoleEnum = pgEnum("role", ["admin", "doctor", "inventory_manager","receptionist"])
export const userRole = pgTable("user_role", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").references(() => user.id),
  role: UserRoleEnum('role').notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export const roleRelations = relations(userRole, ({one}) => ({
  user: one(user, {relationName:"user", fields: [userRole.userId], references: [user.id]}),
}));

export const UserSexEnum = pgEnum("sex", ["male", "female"])
export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull().default(''),
  lastName: text("last_name").notNull().default(''),
  middleName: text("middle_name").notNull().default(''), //optional
  suffix: text("suffix").notNull().default(''), // optional
  nickName: text("nick_name").default(''), // optional
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  sex: UserSexEnum('sex').notNull(),
  birthDate: pgDate("birth_date"),
  address: text("address").notNull().default(''),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userRelations = relations(user, ({one, many}) => ({
  auth: one(auth, {relationName:'auth', fields: [user.id], references: [auth.userId]}),
  oauth: one(oauth, {relationName:'oauth', fields: [user.id], references: [oauth.userId]}),
  roles: many(userRole),
}));
export const oauth = pgTable("oauth", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").references(() => user.id),
  provider: text("provider", {enum: ['google']}).notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const oauthRelations = relations(oauth, ({one}) => ({
  user: one(user, {fields: [oauth.userId], references: [user.id]}),
}));
export const patient = pgTable("patients", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  middleName: text("middle_name").notNull().default(''), //optional
  suffix: text("suffix").notNull().default(''), // optional
  nickName: text("nick_name").default(''), // optional
  email: text("email").notNull(),
  sex: UserSexEnum('sex').notNull(),
  birthDate: pgDate("birth_date"),
  religion: text("religion").notNull().default(''),
  nationality: text("nationality").default(''),
  homeAddress: text("home_address").notNull().default(''),
  homeNumber: text("home_number").notNull().default(''),
  occupation: text("occupation").notNull().default(''),
  insurance: text("insurance").notNull().default(''),
  effectiveDate: pgDate("effective_date"), // optional
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  referrer: text("referrer").notNull().default(''),
  officeNumber: text("office_number").notNull().default(''),
  mobileNumber: text("mobile_number").notNull().default(''),
  consultationReason: text("consultation_reason").notNull().default(''),
  parentGuardian: text("parent_guardian").notNull().default(''),//optional
  parentGuardianOccupation: text("parent_guardian_occupation").notNull().default(''),//optional
});
