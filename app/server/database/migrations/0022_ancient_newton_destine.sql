ALTER TABLE "tooth_condition" RENAME COLUMN "treatment_id" TO "intraoral_exam_id";--> statement-breakpoint
ALTER TABLE "tooth_condition" DROP CONSTRAINT "tooth_condition_treatment_id_intraoralExam_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tooth_condition" ADD CONSTRAINT "tooth_condition_intraoral_exam_id_intraoralExam_id_fk" FOREIGN KEY ("intraoral_exam_id") REFERENCES "public"."intraoralExam"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
