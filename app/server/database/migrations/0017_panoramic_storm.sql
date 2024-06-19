ALTER TABLE "dental_chart" ADD COLUMN "dental_insurance" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "dental_chart" ADD COLUMN "effective_date" date;