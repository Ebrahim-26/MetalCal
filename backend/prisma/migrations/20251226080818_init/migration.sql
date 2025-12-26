-- CreateTable
CREATE TABLE "Entry" (
    "id" SERIAL NOT NULL,
    "weight" INTEGER NOT NULL,
    "actualWeight" INTEGER NOT NULL,
    "jumboBag" INTEGER NOT NULL,
    "jumboBagWg" INTEGER NOT NULL,
    "smallBag" INTEGER NOT NULL,
    "smallBagWg" INTEGER NOT NULL,
    "selectedMetal" INTEGER NOT NULL,
    "metalWeight" INTEGER NOT NULL,
    "wastage" INTEGER NOT NULL,
    "totalWastage" INTEGER NOT NULL,
    "otherMetalsWg" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OtherMetal" (
    "id" SERIAL NOT NULL,
    "name" INTEGER,
    "weight" INTEGER NOT NULL,
    "entryId" INTEGER NOT NULL,

    CONSTRAINT "OtherMetal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OtherMetal" ADD CONSTRAINT "OtherMetal_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
