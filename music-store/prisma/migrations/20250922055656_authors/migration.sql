-- CreateTable
CREATE TABLE "public"."author" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "country" VARCHAR(50) NOT NULL,
    "description" VARCHAR(1000),
    "photo" VARCHAR(500),
    "date_of_birth" TIMESTAMPTZ NOT NULL,
    "date_of_death" TIMESTAMPTZ,

    CONSTRAINT "author_pkey" PRIMARY KEY ("id")
);
