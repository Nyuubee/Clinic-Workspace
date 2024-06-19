ALTER TABLE "treatment" ADD COLUMN "periodental_screening_id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "treatment" ADD COLUMN "occlusion_id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "treatment" ADD COLUMN "appliances_id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "treatment" ADD COLUMN "TMD_id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "treatment" ADD COLUMN "xray_taken_id" serial NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "treatment" ADD CONSTRAINT "treatment_periodental_screening_id_periodental_screening_id_fk" FOREIGN KEY ("periodental_screening_id") REFERENCES "public"."periodental_screening"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "treatment" ADD CONSTRAINT "treatment_occlusion_id_occlusion_id_fk" FOREIGN KEY ("occlusion_id") REFERENCES "public"."occlusion"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "treatment" ADD CONSTRAINT "treatment_appliances_id_appliances_id_fk" FOREIGN KEY ("appliances_id") REFERENCES "public"."appliances"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "treatment" ADD CONSTRAINT "treatment_TMD_id_TMD_id_fk" FOREIGN KEY ("TMD_id") REFERENCES "public"."TMD"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "treatment" ADD CONSTRAINT "treatment_xray_taken_id_xray_taken_id_fk" FOREIGN KEY ("xray_taken_id") REFERENCES "public"."xray_taken"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "treatment" DROP COLUMN IF EXISTS "tooth_numbers";