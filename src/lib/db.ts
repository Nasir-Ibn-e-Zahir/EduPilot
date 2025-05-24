// lib/db.ts
import { PrismaClient } from "../../prisma/generated-client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"], // Optional: logs every query in the terminal (helpful for debugging)
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
