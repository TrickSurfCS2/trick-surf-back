import type { Prisma } from '@prisma/client';
import type { IUpdatePayload, IWherePayload } from '#/types/prisma-helpers';
import prisma from '#/prisma';

class UserService {
  //* Create

  //* Read
  getAll = async () => prisma.user.findMany();

  getAllByWhere = async <T>(payload: IWherePayload<T, Prisma.UserWhereInput>) =>
    prisma.user.findMany({ ...payload.query, where: payload.where });

  getByWhere = async <T>(payload: IWherePayload<T, Prisma.UserWhereInput>) =>
    prisma.user.findFirst({ ...payload.query, where: payload.where });

  //* Update
  update = async <T>(
    payload: IUpdatePayload<T, Prisma.UserWhereUniqueInput, Prisma.UserUpdateInput>
  ) =>
    prisma.user.update({
      ...payload.query,
      where: payload.where,
      data: payload.data
    });

  //* Delete
}

export default UserService;
