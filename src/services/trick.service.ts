import type { IUpdatePayload, IWherePayload } from '#/types/prisma-helpers';
import { Prisma } from '@prisma/client';
import prisma from '#/prisma';

interface ListParams {
  mapId?: number;
}

class TrickService {
  //* Create

  //* Read
  getAll = async () => prisma.trick.findMany();

  getList = async (params: ListParams) => {
    const { mapId } = params;

    return prisma.$queryRaw`
        SELECT
            CAST(ROW_NUMBER() OVER () AS INT) AS "index",
            st.id,
            st.name,
            st.point,
            st."startType",
            st."createdAt",
            (
                SELECT string_agg(str."name", ',')
                FROM (
                    SELECT str.name
                    FROM "trick" ts
                    JOIN "route" sr ON ts.id = sr."trickId"
                    JOIN "trigger" str ON str.id = sr."triggerId"
                    WHERE ts.id = st.id
                    ORDER BY sr.id
                ) AS str
            ) AS "route",
            (
                SELECT string_agg(CAST(str.id AS TEXT), ',')
                FROM "trick" ts
                JOIN "route" sr ON ts.id = sr."trickId"
                JOIN "trigger" str ON str.id = sr."triggerId"
                WHERE ts.id = st.id
                GROUP BY ts.id
                ORDER BY ts.id DESC
            ) AS "routeIds",
            (
                SELECT CAST(count(sr.id) AS INT)
                FROM "trick" ts
                JOIN "route" sr ON ts.id = sr."trickId"
                WHERE ts.id = st.id
            ) AS "trickLength",
            author.steamid64 AS "authorSteamid64",
            CAST(COALESCE(c.counts, 0) AS INT) AS "totalCompletes"
        FROM "trick" st
        LEFT JOIN (
            SELECT sc."trickId", COUNT(sc."trickId") AS counts
            FROM "complete" AS sc
            GROUP BY sc."trickId"
        ) c ON c."trickId" = st.id
        LEFT JOIN "user" author ON author.id = st."authorId"
        ${mapId ? Prisma.sql`WHERE st."mapId" = ${mapId}` : Prisma.empty}
    `;
  };

  getAllByWhere = async <T>(payload: IWherePayload<T, Prisma.TrickWhereInput>) =>
    prisma.trick.findMany({ ...payload.query, where: payload.where });

  getByWhere = async <T>(payload: IWherePayload<T, Prisma.TrickWhereInput>) =>
    prisma.trick.findFirst({ ...payload.query, where: payload.where });

  //* Update
  update = async <T>(
    payload: IUpdatePayload<T, Prisma.TrickWhereUniqueInput, Prisma.TrickUpdateInput>
  ) =>
    prisma.trick.update({
      ...payload.query,
      where: payload.where,
      data: payload.data
    });

  //* Delete
}

export default TrickService;
