ALTER TABLE "intraoralExam" DROP CONSTRAINT "intraoralExam_doctor_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "intraoralExam" DROP CONSTRAINT "intraoralExam_patient_id_patients_id_fk";
--> statement-breakpoint
ALTER TABLE "dental_chart" ALTER COLUMN "allergies" SET DEFAULT '[]'::json;--> statement-breakpoint
ALTER TABLE "intraoralExam" ADD COLUMN "dental_chart_id" serial NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "intraoralExam" ADD CONSTRAINT "intraoralExam_dental_chart_id_dental_chart_id_fk" FOREIGN KEY ("dental_chart_id") REFERENCES "public"."dental_chart"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "intraoralExam" DROP COLUMN IF EXISTS "doctor_id";--> statement-breakpoint
ALTER TABLE "intraoralExam" DROP COLUMN IF EXISTS "patient_id";