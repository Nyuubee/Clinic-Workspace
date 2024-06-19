ALTER TABLE "treatment" DROP CONSTRAINT "treatment_dental_record_id_intraoralExam_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "treatment" ADD CONSTRAINT "treatment_dental_record_id_dental_chart_id_fk" FOREIGN KEY ("dental_record_id") REFERENCES "public"."dental_chart"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "treatment" DROP COLUMN IF EXISTS "next_appointment";