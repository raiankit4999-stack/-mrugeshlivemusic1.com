-- CreateTable
CREATE TABLE "OnboardingSubmission" (
    "id" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "email" TEXT,
    "eventTypes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "eventDate" TIMESTAMP(3) NOT NULL,
    "eventTime" TEXT,
    "eventVenue" TEXT NOT NULL,
    "eventDuration" TEXT,
    "totalAmount" INTEGER,
    "advanceAmount" INTEGER,
    "remainingAmount" INTEGER,
    "paymentMode" TEXT,
    "paymentModeOther" TEXT,
    "notes" TEXT,
    "termsAccepted" BOOLEAN NOT NULL DEFAULT false,
    "reviewed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OnboardingSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OnboardingSubmission_reviewed_createdAt_idx" ON "OnboardingSubmission"("reviewed", "createdAt");
