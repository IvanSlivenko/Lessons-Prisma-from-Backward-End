-- CreateTable
CREATE TABLE "public"."album" (
    "id" UUID NOT NULL,
    "author_id" UUID NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "description" VARCHAR(1000) NOT NULL,
    "cover" VARCHAR(500) NOT NULL,
    "date" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "album_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "album_name_key" ON "public"."album"("name");

-- AddForeignKey
ALTER TABLE "public"."album" ADD CONSTRAINT "album_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."author"("id") ON DELETE CASCADE ON UPDATE CASCADE;
