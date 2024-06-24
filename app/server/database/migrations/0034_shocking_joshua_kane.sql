CREATE TABLE IF NOT EXISTS "appointments" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" text NOT NULL,
	"middleName" text,
	"lastName" text NOT NULL,
	"appointmentDate" date,
	"appointmentTime" text NOT NULL,
	"purpose" text NOT NULL,
	"notes" text
);
