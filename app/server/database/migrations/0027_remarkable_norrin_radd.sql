CREATE TABLE IF NOT EXISTS "oauth" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"provider" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
