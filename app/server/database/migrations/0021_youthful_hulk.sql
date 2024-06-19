ALTER TABLE "intraoralExam" DROP CONSTRAINT "intraoralExam_patient_id_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "intraoralExam" ADD CONSTRAINT "intraoralExam_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
