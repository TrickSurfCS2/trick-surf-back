import type { Request, Response } from 'express'
import type AController from '../interfaces/controller.interface'
import TriggerService from '#/services/trigger.service'

import { catcherMiddleware, validateRequest } from '#/utils/middleware'
import { Router } from 'express'
import { query } from 'express-validator'

class TriggerController implements AController {
  private service = new TriggerService()
  public path = '/trigger'
  public router = Router()

  constructor() {
    this.router.get(`${this.path}/`, [
      query('mapId').optional().isInt(),
      query('name').optional().isString(),
      query('fullName').optional().isString(),
      query('id').optional().isInt(),
      validateRequest,
    ], catcherMiddleware(this.getAll))
  }

  private getAll = async (req: Request, res: Response) => {
    const { mapId, name, fullName, id } = req.query

    const where = {
      id: id ? +id : undefined,
      mapId: mapId ? +mapId : undefined,
      name: name ? `${name}` : undefined,
      fullName: fullName ? `${fullName}` : undefined,
    }

    const trigger = await this.service.getAllByWhere({ where })
    res.json(trigger)
  }
}

export { TriggerController }

export default TriggerController
