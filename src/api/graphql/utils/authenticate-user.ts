import type { YogaInitialContext } from 'graphql-yoga';
import type { JwtPayload } from 'jsonwebtoken';
import { secrets } from './jwt';
import { type PrismaClient } from '@prisma/client';
import { verify } from 'jsonwebtoken';

export const authenticateUser = async (
  prisma: PrismaClient,
  request: YogaInitialContext['request']
) => {
  const header = request.headers.get('authorization');

  if (header !== null) {
    try {
      const token = header.split(' ')[1];
      const tokenPayload = verify(token, secrets.JWT_ACCESS_SECRET as string) as JwtPayload;

      const { userId } = tokenPayload;

      return await prisma.user.findUnique({ where: { id: userId } });
    } catch (error) {
      return null;
    }
  }
  return null;
};
