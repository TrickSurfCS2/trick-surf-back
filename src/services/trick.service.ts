import type { IUpdatePayload, IWherePayload } from '#/types/prisma-helpers'
import prisma from '#/prisma'
import { Prisma } from '@prisma/client'

interface ListParams {
  mapId?: number
}

class TrickService {
  //* Create

  //* Read
  getAll = async () => prisma.trick.findMany()

  getList = async (params: ListParams) => {
    const { mapId } = params

    return prisma.$queryRaw`
        WITH route AS (
          SELECT 
            sr."trickId", 
            string_agg(tr.name, ',') AS route,
            string_agg(sr."triggerId"::text, ',') AS "routeIds"
          FROM "route" sr
          JOIN "trigger" tr ON tr.id = sr."triggerId" 
          GROUP BY sr."trickId"
        ),
        completes AS (
          SELECT 
            sc."trickId", 
            COUNT(sc."trickId") AS "totalCompletes"
          FROM "complete" sc
          GROUP BY sc."trickId"  
        )
        SELECT
          CAST((ROW_NUMBER() OVER ()) AS int) AS "index",
          st.id,
          st.name,
          st.point,
          st."startType",
          st."createdAt",
          r.route,
          r."routeIds",
          CAST((SELECT COUNT(*) FROM "route" sr WHERE sr."trickId" = st.id) AS int) AS "trickLength",
          author.steamid AS "authorSteamid",
          COALESCE(CAST(c."totalCompletes" AS int), 0) AS "totalCompletes"
        FROM "trick" st
        LEFT JOIN route r ON r."trickId" = st.id
        LEFT JOIN "completes" c ON c."trickId" = st.id  
        LEFT JOIN "user" author ON author.id = st."authorId"
        ${mapId ? Prisma.sql`WHERE st."mapId" = ${mapId}` : Prisma.empty}
    `
  }

  getAllByWhere = async <T>(payload: IWherePayload<T, Prisma.TrickWhereInput>) =>
    prisma.trick.findMany({ ...payload.query, where: payload.where })

  getByWhere = async <T>(payload: IWherePayload<T, Prisma.TrickWhereInput>) =>
    prisma.trick.findFirst({ ...payload.query, where: payload.where })

  //* Update
  update = async <T>(
    payload: IUpdatePayload<T, Prisma.TrickWhereUniqueInput, Prisma.TrickUpdateInput>,
  ) =>
    prisma.trick.update({
      ...payload.query,
      where: payload.where,
      data: payload.data,
    })

  //* Delete
}

export default TrickService
