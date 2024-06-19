ALTER TABLE "patient_record" RENAME TO "dental_chart";--> statement-breakpoint
ALTER TABLE "dental_record" RENAME TO "intraoralExam";--> statement-breakpoint
ALTER TABLE "treatment" DROP CONSTRAINT "treatment_dental_record_id_dental_record_id_fk";
--> statement-breakpoint
ALTER TABLE "dental_chart" DROP CONSTRAINT "patient_record_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "intraoralExam" DROP CONSTRAINT "dental_record_doctor_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "intraoralExam" DROP CONSTRAINT "dental_record_patient_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "intraoralExam" DROP CONSTRAINT "dental_record_periodental_screening_id_periodental_screening_id_fk";
--> statement-breakpoint
ALTER TABLE "intraoralExam" DROP CONSTRAINT "dental_record_occlusion_id_occlusion_id_fk";
--> statement-breakpoint
ALTER TABLE "intraoralExam" DROP CONSTRAINT "dental_record_appliances_id_appliances_id_fk";
--> statement-breakpoint
ALTER TABLE "intraoralExam" DROP CONSTRAINT "dental_record_TMD_id_TMD_id_fk";
--> statement-breakpoint
ALTER TABLE "intraoralExam" DROP CONSTRAINT "dental_record_xray_taken_id_xray_taken_id_fk";
--> statement-breakpoint
ALTER TABLE "tooth_condition" DROP CONSTRAINT "tooth_condition_treatment_id_dental_record_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "treatment" ADD CONSTRAINT "treatment_dental_record_id_intraoralExam_id_fk" FOREIGN KEY ("dental_record_id") REFERENCES "public"."intraoralExam"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dental_chart" ADD CONSTRAINT "dental_chart_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "intraoralExam" ADD CONSTRAINT "intraoralExam_doctor_id_user_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "intraoralExam" ADD CONSTRAINT "intraoralExam_patient_id_user_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "intraoralExam" ADD CONSTRAINT "intraoralExam_periodental_screening_id_periodental_screening_id_fk" FOREIGN KEY ("periodental_screening_id") REFERENCES "public"."periodental_screening"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "intraoralExam" ADD CONSTRAINT "intraoralExam_occlusion_id_occlusion_id_fk" FOREIGN KEY ("occlusion_id") REFERENCES "public"."occlusion"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "intraoralExam" ADD CONSTRAINT "intraoralExam_appliances_id_appliances_id_fk" FOREIGN KEY ("appliances_id") REFERENCES "public"."appliances"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "intraoralExam" ADD CONSTRAINT "intraoralExam_TMD_id_TMD_id_fk" FOREIGN KEY ("TMD_id") REFERENCES "public"."TMD"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "intraoralExam" ADD CONSTRAINT "intraoralExam_xray_taken_id_xray_taken_id_fk" FOREIGN KEY ("xray_taken_id") REFERENCES "public"."xray_taken"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tooth_condition" ADD CONSTRAINT "tooth_condition_treatment_id_intraoralExam_id_fk" FOREIGN KEY ("treatment_id") REFERENCES "public"."intraoralExam"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
