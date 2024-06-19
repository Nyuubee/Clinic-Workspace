CREATE TABLE IF NOT EXISTS "patients" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"middle_name" text DEFAULT '' NOT NULL,
	"suffix" text DEFAULT '' NOT NULL,
	"nick_name" text DEFAULT '',
	"role" "role" NOT NULL,
	"email" text NOT NULL,
	"sex" "sex" NOT NULL,
	"birth_date" date,
	"religion" text DEFAULT '' NOT NULL,
	"nationality" text DEFAULT '',
	"home_address" text DEFAULT '' NOT NULL,
	"home_number" text DEFAULT '' NOT NULL,
	"occupation" text DEFAULT '' NOT NULL,
	"insurance" text DEFAULT '' NOT NULL,
	"effective_date" date,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"referrer" text DEFAULT '' NOT NULL,
	"office_number" text DEFAULT '' NOT NULL,
	"mobile_number" text DEFAULT '' NOT NULL,
	"consultation_reason" text DEFAULT '' NOT NULL,
	"parent_guardian" text DEFAULT '' NOT NULL,
	"parent_guardian_occupation" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "dental_chart" RENAME COLUMN "user_id" TO "patient_id";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_first_name_middle_name_last_name_suffix_birth_date_role_unique";--> statement-breakpoint
ALTER TABLE "dental_chart" DROP CONSTRAINT "dental_chart_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "first_name" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "last_name" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "nick_name" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "dental_chart" ADD COLUMN "doctor_id" serial NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dental_chart" ADD CONSTRAINT "dental_chart_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dental_chart" ADD CONSTRAINT "dental_chart_doctor_id_user_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "dental_chart" DROP COLUMN IF EXISTS "religion";--> statement-breakpoint
ALTER TABLE "dental_chart" DROP COLUMN IF EXISTS "occupation";--> statement-breakpoint
ALTER TABLE "dental_chart" DROP COLUMN IF EXISTS "nationality";--> statement-breakpoint
ALTER TABLE "dental_chart" DROP COLUMN IF EXISTS "home_address";--> statement-breakpoint
ALTER TABLE "dental_chart" DROP COLUMN IF EXISTS "home_no";--> statement-breakpoint
ALTER TABLE "dental_chart" DROP COLUMN IF EXISTS "parent_guardian";--> statement-breakpoint
ALTER TABLE "dental_chart" DROP COLUMN IF EXISTS "parent_guardian_occupation";--> statement-breakpoint
ALTER TABLE "dental_chart" DROP COLUMN IF EXISTS "referrer";--> statement-breakpoint
ALTER TABLE "dental_chart" DROP COLUMN IF EXISTS "consultation_reason";--> statement-breakpoint
ALTER TABLE "dental_chart" DROP COLUMN IF EXISTS "dental_insurance";--> statement-breakpoint
ALTER TABLE "dental_chart" DROP COLUMN IF EXISTS "effective_date";