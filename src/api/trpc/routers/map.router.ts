import MapService from '#/services/map.service'

import type { } from '@trpc/server'
import type { TRPCRouterParams } from '../interfaces/router.interface'

class MapRouter {
  private service = new MapService()

  constructor(private trpc: TRPCRouterParams) {
  }

  private getAll = () => {
    return this.trpc.procedure.query(() =>
      this.service.getAll(),
    )
  }

  get router() {
    return this.trpc.router({
      getAll: this.getAll(),
    })
  }
}

export default MapRouter
