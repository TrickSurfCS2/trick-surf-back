import type { Request, Response } from 'express'
import type AController from '../interfaces/controller.interface'
import TrickService from '#/services/trick.service'

import { catcherMiddleware, validateRequest } from '#/utils/middleware'
import { Router } from 'express'
import { param, query } from 'express-validator'

class TrickController implements AController {
  private service = new TrickService()

  public path = '/trick'
  public router = Router()

  constructor() {
    this.router.get(`${this.path}/`, catcherMiddleware(this.getAll))
    this.router.get(`${this.path}/:trickId/wr`, [
      param('trickId').isInt().toInt(),
      validateRequest,
    ], catcherMiddleware(this.getRecord))
    this.router.get(`${this.path}/list`, [
      query('mapId').optional().isInt(),
      validateRequest,
    ], catcherMiddleware(this.getList))
  }

  private getAll = async (_: Request, res: Response) => {
    const result = await this.service.getAll()
    res.status(200).json(result)
  }

  private getList = async (req: Request, res: Response) => {
    const { mapId } = req.query

    const where = { mapId: mapId ? +mapId : undefined }

    const result = await this.service.getList(where)
    res.status(200).json(result)
  }

  private getRecord = async (req: Request, res: Response) => {
    const result = await this.service.getRecord(+req.params.trickId)
    res.status(200).json(result)
  }
}

export { TrickController }

export default TrickController
