-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "googleReviewId" TEXT,
    "authorName" TEXT NOT NULL,
    "authorPhoto" TEXT,
    "rating" INTEGER NOT NULL,
    "reviewText" TEXT,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'google',
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "businessReply" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reviews_googleReviewId_key" ON "reviews"("googleReviewId");

-- CreateIndex
CREATE INDEX "reviews_rating_idx" ON "reviews"("rating");

-- CreateIndex
CREATE INDEX "reviews_publishedAt_idx" ON "reviews"("publishedAt");

-- CreateIndex
CREATE INDEX "reviews_isFeatured_idx" ON "reviews"("isFeatured");

-- CreateIndex
CREATE INDEX "reviews_isVisible_idx" ON "reviews"("isVisible");
