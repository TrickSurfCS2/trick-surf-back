import type { TRPC } from '..'

export interface TRPCRouterParams {
  router: TRPC['router']
  procedure: TRPC['procedure']
}
