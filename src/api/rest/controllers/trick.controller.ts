import TrickService from '#/services/trick.service'
import { validateRequest } from '#/utils/middleware/validate.middleware'
import { Router } from 'express'

import { query } from 'express-validator'
import type { Request, Response } from 'express'
import type AController from '../interfaces/controller.interface'

class TrickController implements AController {
  private service = new TrickService()

  public path = '/trick'
  public router = Router()

  constructor() {
    this.router.get(`${this.path}/`, this.getAll)
    this.router.get(`${this.path}/list`, [
      query('mapId').optional().isInt(),
      validateRequest,
    ], this.getList)
  }

  private getAll = async (_: Request, res: Response) => {
    try {
      const tricks = await this.service.getAll()
      res.status(200).json(tricks)
    }
    catch {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  private getList = async (req: Request, res: Response) => {
    try {
      const { mapId } = req.query

      const where = { mapId: mapId ? +mapId : undefined }

      const tricks = await this.service.getList(where)
      res.status(200).json(tricks)
    }
    catch {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}

export { TrickController }

export default TrickController
