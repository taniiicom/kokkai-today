-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "tomorrow_index";

-- CreateTable
CREATE TABLE "tomorrow_index"."word_counts" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "word" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "word_counts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "word_counts_date_word_key" ON "tomorrow_index"."word_counts"("date", "word");
