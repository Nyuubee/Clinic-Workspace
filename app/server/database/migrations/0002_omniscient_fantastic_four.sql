ALTER TABLE "user" ADD COLUMN "nick_name" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "birth_date" date;--> statement-breakpoint
ALTER TABLE "auth" ADD CONSTRAINT "auth_username_unique" UNIQUE("username");