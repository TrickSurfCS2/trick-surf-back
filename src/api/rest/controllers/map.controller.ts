import type { Request, Response } from 'express'
import { Router } from 'express'

import type AController from '../interfaces/controller.interface'
import MapService from '#/services/map.service'

class MapController implements AController {
  private service = new MapService()

  public path = '/map'
  public router = Router()

  constructor() {
    this.router.get(`${this.path}/`, this.getAll)
  }

  private getAll = async (_: Request, res: Response) => {
    try {
      const data = await this.service.getAll()
      res.status(200).json(data)
    }
    catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default MapController
