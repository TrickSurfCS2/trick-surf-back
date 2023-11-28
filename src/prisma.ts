/* eslint-disable ts/no-namespace */
/* eslint-disable unused-imports/no-unused-vars */
import { PrismaClient } from '@prisma/client'

declare let global: { prisma: PrismaClient }
declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient
    }
  }
}

const prisma: PrismaClient = new PrismaClient()

export default prisma
