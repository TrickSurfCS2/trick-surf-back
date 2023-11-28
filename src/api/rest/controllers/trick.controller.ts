import type { Request, Response } from 'express'
import { Router } from 'express'

import TrickService from '#/services/trick.service'

class TrickController {
  public path = '/trick'

  public router = Router()
  private service = new TrickService()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.getAll)
    this.router.get(`${this.path}/list`, this.getList)
  }

  private getAll = async (_: Request, res: Response) => {
    const tricks = await this.service.getAll()
    res.json(tricks)
  }

  private getList = async (req: Request, res: Response) => {
    const { mapId } = req.query

    const where = { mapId: mapId ? +mapId : undefined }

    const tricks = await this.service.getList(where)
    res.json(tricks)
  }
}

export default TrickController
