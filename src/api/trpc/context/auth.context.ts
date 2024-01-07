import type { CreateExpressContextOptions } from '@trpc/server/adapters/express'

async function authContext(opts: CreateExpressContextOptions) {
  const getUser = () => {
    if (opts.req.headers.authorization !== 'TODO')
      return null

    return {
      name: 'TODO',
    }
  }

  return {
    user: getUser(),
  }
}

export { authContext }
