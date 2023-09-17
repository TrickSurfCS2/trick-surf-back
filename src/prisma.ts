/* eslint-disable @typescript-eslint/no-namespace */
import { PrismaClient } from '@prisma/client';

declare let global: { prisma: PrismaClient };
declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}

const prisma: PrismaClient = new PrismaClient();

export default prisma;
