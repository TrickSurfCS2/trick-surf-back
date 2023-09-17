import type { Prisma } from '@prisma/client';
import type { IUpdatePayload, IWherePayload } from '#/types/prisma-helpers';
import prisma from '#/prisma';

class TrickService {
  //* Create

  //* Read
  getAll = async () => prisma.trick.findMany();

  getList = async () => {
    return prisma.$queryRaw`
      SELECT st.id,
            st.name,
            st.point,
            st."startType",
            st."createdAt",
            (SELECT string_agg(str.name, ',')
              FROM "trick" ts
                      JOIN "route" sr ON ts.id = sr."trickId"
                      JOIN "trigger" str ON str.id = sr."triggerId"
              WHERE ts.id = st.id) AS "route",
            (SELECT string_agg(CAST(str.id AS TEXT), ',')
              FROM "trick" ts
                      JOIN "route" sr ON ts.id = sr."trickId"
                      JOIN "trigger" str ON str.id = sr."triggerId"
              WHERE ts.id = st.id) AS "routeIds",
            (SELECT CAST(count(sr.id) AS INT)
              FROM "trick" ts
                      JOIN "route" sr ON ts.id = sr."trickId"
              WHERE ts.id = st.id) AS "trickLength",
            p.steamid64 as "authorSteamid64",
            p.username,
            st."mapId"
      FROM "trick" st
      LEFT JOIN "user" p ON p.id = st."authorId";
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
