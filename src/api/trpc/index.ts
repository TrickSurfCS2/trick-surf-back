/* eslint-disable unused-imports/no-unused-vars */
import { TRPCError, initTRPC } from '@trpc/server'
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express'
import MapRouter from './routers/map.router'
import { authContext } from './context/auth.context'

async function createContext(opts: CreateExpressContextOptions) {
  const auth = await authContext(opts)

  return {
    ...auth,
    req: opts.req,
    res: opts.res,
  }
}

type Context = Awaited<ReturnType<typeof createContext>>

const t = initTRPC.context<Context>().create()

const router = t.router
const publicProcedure = t.procedure
const protectedProcedure = t.procedure.use((opts) => {
  if (!opts.ctx.user?.name) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    })
  }

  return opts.next({
    ctx: {
      user: opts.ctx.user,
    },
  })
})

const trpcRouter = t.router({
  map: new MapRouter({ router, procedure: publicProcedure }).router,
})

export { trpcRouter, createContext }
export type TRPC = typeof t
export type AppRouter = typeof trpcRouter
