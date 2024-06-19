DO $$ BEGIN
 CREATE TYPE "public"."occlusion_molar_class" AS ENUM('Normal', 'I', 'II', 'III');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "patient_record" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"religion" text,
	"occupation" text,
	"home_address" text,
	"nationality" text,
	"home_no" text,
	"office_no" text,
	"fax_no" text,
	"parent_guardian" text,
	"parent_guardian_occupation" text,
	"referrer" text,
	"consultation_reason" text,
	"previous_dentist" text,
	"last_dental_visit" date,
	"physician" text,
	"specialty" text,
	"office_address" text,
	"office_number" text,
	"is_in_good_health" boolean NOT NULL,
	"" text,
	"illness_operation" text,
	"last_hospitalization" date,
	"hospitalization_reason" text,
	"prescribed_or_nonprescribed_medicine" text,
	"uses_tobacco" boolean,
	"consumes_alcohol" boolean,
	"uses_dangerous_drugs" boolean,
	"allergies" json,
	"bleeding_time" text,
	"is_pregnant" boolean,
	"is_nursing" boolean,
	"is_taking_birth_control" boolean,
	"blood_type" text,
	"many_conditions" json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "TMD" (
	"id" serial PRIMARY KEY NOT NULL,
	"clenching" boolean,
	"clicking" boolean,
	"trismus" boolean,
	"muscle_spasm" boolean,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "appliances" (
	"id" serial PRIMARY KEY NOT NULL,
	"orthodontic" boolean,
	"stayplate" boolean,
	"others_content" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dental_record" (
	"id" serial PRIMARY KEY NOT NULL,
	"doctor_id" serial NOT NULL,
	"patient_id" serial NOT NULL,
	"periodental_screening_id" serial NOT NULL,
	"occlusion_id" serial NOT NULL,
	"appliances_id" serial NOT NULL,
	"TMD_id" serial NOT NULL,
	"xray_taken_id" serial NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "occlusion" (
	"id" serial PRIMARY KEY NOT NULL,
	"molar_class" "occlusion_molar_class",
	"overjet" boolean,
	"overbite" boolean,
	"midline_deviation" boolean,
	"crossbite" boolean,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "periodental_screening" (
	"id" serial PRIMARY KEY NOT NULL,
	"gingivitis" boolean NOT NULL,
	"early_periodontitis" boolean NOT NULL,
	"moderate_periodontitis" boolean NOT NULL,
	"advanced_periodontitis" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tooth_condition" (
	"id" serial PRIMARY KEY NOT NULL,
	"treatment_id" serial NOT NULL,
	"tooth_id" smallint NOT NULL,
	"condition" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "xray_taken" (
	"id" serial PRIMARY KEY NOT NULL,
	"periapical" text,
	"tth_no" numeric,
	"panoramic" boolean,
	"cephalometric" boolean,
	"occlusal" text,
	"others" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "patient_record" ADD CONSTRAINT "patient_record_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dental_record" ADD CONSTRAINT "dental_record_doctor_id_user_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dental_record" ADD CONSTRAINT "dental_record_patient_id_user_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dental_record" ADD CONSTRAINT "dental_record_periodental_screening_id_periodental_screening_id_fk" FOREIGN KEY ("periodental_screening_id") REFERENCES "public"."periodental_screening"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dental_record" ADD CONSTRAINT "dental_record_occlusion_id_occlusion_id_fk" FOREIGN KEY ("occlusion_id") REFERENCES "public"."occlusion"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dental_record" ADD CONSTRAINT "dental_record_appliances_id_appliances_id_fk" FOREIGN KEY ("appliances_id") REFERENCES "public"."appliances"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dental_record" ADD CONSTRAINT "dental_record_TMD_id_TMD_id_fk" FOREIGN KEY ("TMD_id") REFERENCES "public"."TMD"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dental_record" ADD CONSTRAINT "dental_record_xray_taken_id_xray_taken_id_fk" FOREIGN KEY ("xray_taken_id") REFERENCES "public"."xray_taken"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tooth_condition" ADD CONSTRAINT "tooth_condition_treatment_id_dental_record_id_fk" FOREIGN KEY ("treatment_id") REFERENCES "public"."dental_record"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
