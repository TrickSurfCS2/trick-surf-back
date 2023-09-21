import type { context } from './context';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import type { NormalizeSchemeBuilderOptions } from '@pothos/core';
import SchemaBuilder from '@pothos/core';
import { DateResolver, DateTimeResolver } from 'graphql-scalars';
import PrismaPlugin from '@pothos/plugin-prisma';
import ErrorsPlugin from '@pothos/plugin-errors';
import RelayPlugin from '@pothos/plugin-relay';
import TracingPlugin, { wrapResolver, isRootField } from '@pothos/plugin-tracing';
import prisma from '#/prisma';

type ISchemaBuilder = {
  Scalars: {
    Date: { Input: Date; Output: Date };
    TimestampTZ: { Input: Date; Output: Date };
    UUID: { Input: string; Output: string };
  };
  PrismaTypes: PrismaTypes;
  Context: ReturnType<typeof context>;
};

// export const builder = new SchemaBuilder<ISchemaBuilder>({
//   plugins: [PrismaPlugin, ErrorsPlugin, RelayPlugin, TracingPlugin],
//   relayOptions: {
//     clientMutationId: 'omit',
//     cursorType: 'String'
//   },
//   prisma: {
//     client: prisma
//   },
//   errorOptions: {
//     defaultTypes: []
//   },
//   tracing: {
//     default: (config) => isRootField(config),
//     wrap: (resolver, options, config) =>
//       wrapResolver(resolver, (error, duration) => {
//         if (process.env.NODE_ENV === 'development') {
//           console.log(
//             '\x1B[34m%s',
//             `Executed resolver ${config.parentType}.${config.name} in ${duration}ms`
//           );

//           if (error) console.log(error);
//         }

//         const data = {
//           duration,
//           args: {},
//           description: config.description ?? '',
//           kind: config.kind,
//           pothosOptions: {},
//           name: config.name ?? '',
//           parentType: config.parentType ?? ''
//         };

//         prisma.gqlMetric.create({ data });
//       })
//   }
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
// } as unknown as NormalizeSchemeBuilderOptions<any>);

// builder.addScalarType('Date', DateResolver, {});
// builder.addScalarType('TimestampTZ', DateTimeResolver, {});
// builder.scalarType('UUID', {
//   serialize: (n) => n,
//   parseValue: (n) => {
//     if (typeof n === 'string') {
//       return n;
//     }

//     throw new Error('Value must be string');
//   }
// });
// builder.queryType({});
// builder.mutationType({});
// builder.objectType(Error, {
//   name: 'Error',
//   fields: (t) => ({
//     message: t.exposeString('message')
//   })
// });
