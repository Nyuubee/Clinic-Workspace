ALTER TABLE "user" ADD COLUMN "address" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "oauth" ADD CONSTRAINT "oauth_email_unique" UNIQUE("email");