import { builder } from '#/api/graphql/builder';
import UserService from '#/services/user.service';

const service = new UserService();

builder.queryField('users', (t) =>
  t.prismaConnection({
    description: 'Get all users',
    type: 'User',
    cursor: 'id',
    args: {},
    resolve: (query, root, args, ctx, info) => service.getAllByWhere({ query })
  })
);

builder.queryField('me', (t) =>
  t.prismaField({
    description: 'Auth me by access token',
    type: 'User',
    errors: { types: [Error] },
    resolve: async (query, root, args, ctx, info) => {
      const user = await ctx.user;
      if (!user) {
        throw new Error('Not authenticated');
      }
      return user;
    }
  })
);

builder.queryField('userById', (t) =>
  t.prismaField({
    description: 'Get user by id',
    type: 'User',
    args: { id: t.arg({ type: 'UUID', required: true }) },
    errors: { types: [Error] },
    resolve: async (query, root, args, ctx, info) => {
      const user = await service.getByWhere({ where: { id: +args.id } });
      if (!user) {
        throw new Error('Not founded');
      }
      return user;
    }
  })
);
