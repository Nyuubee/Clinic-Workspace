ALTER TABLE "user" ALTER COLUMN "first_name" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "last_name" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "birth_date" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tooth_condition" ADD COLUMN "region" json NOT NULL;--> statement-breakpoint
ALTER TABLE "tooth_condition" ADD COLUMN "states" json NOT NULL;--> statement-breakpoint
ALTER TABLE "tooth_condition" DROP COLUMN IF EXISTS "condition";