import { builder } from '../../builder';
import './query';
import './mutation';

export const UserPrisma = builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeID('id'),
    createdAt: t.expose('createdAt', { nullable: true, type: 'TimestampTZ' }),
    updatedAt: t.expose('updatedAt', { nullable: true, type: 'TimestampTZ' })
  })
});
