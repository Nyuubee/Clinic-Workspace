ALTER TABLE "patient_record" ADD COLUMN "medicalCondition" text;--> statement-breakpoint
ALTER TABLE "patient_record" DROP COLUMN IF EXISTS "office_no";--> statement-breakpoint
ALTER TABLE "patient_record" DROP COLUMN IF EXISTS "fax_no";--> statement-breakpoint
ALTER TABLE "patient_record" DROP COLUMN IF EXISTS "";