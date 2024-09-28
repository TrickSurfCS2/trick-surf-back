import type { Request, Response } from 'express'
import type AController from '../interfaces/controller.interface'

import MapService from '#/services/map.service'
import { catcherMiddleware } from '#/utils/middleware'
import { Router } from 'express'

class MapController implements AController {
  private service = new MapService()

  public path = '/map'
  public router = Router()

  constructor() {
    this.router.get(`${this.path}/`, catcherMiddleware(this.getAll))
  }

  private getAll = async (_: Request, res: Response) => {
    const data = await this.service.getAll()
    res.status(200).json(data)
  }
}

export default MapController
