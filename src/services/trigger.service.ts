import type { IWherePayload } from '#/types/prisma-helpers'
import type { Prisma } from '@prisma/client'
import prisma from '#/prisma'

class TriggerService {
  //* Create

  //* Read
  getAll = async () => prisma.trigger.findMany()

  getAllByWhere = async <T>(payload: IWherePayload<T, Prisma.TriggerWhereInput>) =>
    prisma.trigger.findMany({ ...payload.query, where: payload.where })

  getByWhere = async <T>(payload: IWherePayload<T, Prisma.TriggerWhereInput>) =>
    prisma.trigger.findFirst({ ...payload.query, where: payload.where })

  //* Update

  //* Delete
}

export default TriggerService
