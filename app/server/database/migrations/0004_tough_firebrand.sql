ALTER TABLE "treatment" DROP CONSTRAINT "treatment_doctor_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "treatment" DROP CONSTRAINT "treatment_patient_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "treatment" DROP CONSTRAINT "treatment_periodental_screening_id_periodental_screening_id_fk";
--> statement-breakpoint
ALTER TABLE "treatment" DROP CONSTRAINT "treatment_occlusion_id_occlusion_id_fk";
--> statement-breakpoint
ALTER TABLE "treatment" DROP CONSTRAINT "treatment_appliances_id_appliances_id_fk";
--> statement-breakpoint
ALTER TABLE "treatment" DROP CONSTRAINT "treatment_TMD_id_TMD_id_fk";
--> statement-breakpoint
ALTER TABLE "treatment" DROP CONSTRAINT "treatment_xray_taken_id_xray_taken_id_fk";
--> statement-breakpoint
ALTER TABLE "treatment" ADD COLUMN "dental_record_id" serial NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "treatment" ADD CONSTRAINT "treatment_dental_record_id_dental_record_id_fk" FOREIGN KEY ("dental_record_id") REFERENCES "public"."dental_record"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "treatment" DROP COLUMN IF EXISTS "doctor_id";--> statement-breakpoint
ALTER TABLE "treatment" DROP COLUMN IF EXISTS "patient_id";--> statement-breakpoint
ALTER TABLE "treatment" DROP COLUMN IF EXISTS "periodental_screening_id";--> statement-breakpoint
ALTER TABLE "treatment" DROP COLUMN IF EXISTS "occlusion_id";--> statement-breakpoint
ALTER TABLE "treatment" DROP COLUMN IF EXISTS "appliances_id";--> statement-breakpoint
ALTER TABLE "treatment" DROP COLUMN IF EXISTS "TMD_id";--> statement-breakpoint
ALTER TABLE "treatment" DROP COLUMN IF EXISTS "xray_taken_id";