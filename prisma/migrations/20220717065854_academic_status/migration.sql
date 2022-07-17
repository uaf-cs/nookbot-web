-- CreateEnum
CREATE TYPE "AcademicStatus" AS ENUM ('STUDENT', 'ALUMNI');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "academicStatus" "AcademicStatus";
