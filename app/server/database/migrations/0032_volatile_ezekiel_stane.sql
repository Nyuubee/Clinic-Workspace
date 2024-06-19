ALTER TABLE "treatment" ADD COLUMN "tooth_nos" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "treatment" ADD COLUMN "next_appointment" timestamp;