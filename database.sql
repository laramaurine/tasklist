CREATE TABLE "weekend-to-do-app" (
	-- column-name data-type constraints,
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(120) NOT NULL,
	"status" VARCHAR(120) NOT NULL

);