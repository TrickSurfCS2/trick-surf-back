import type { Request, Response } from 'express'
import { Router } from 'express'

import UserService from '#/services/user.service'

class UserController {
  public router = Router()

  private path = '/user'
  private service = new UserService()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.getAll)
    this.router.get(`${this.path}/:id`, this.getById)
  }

  async getById(req: Request, res: Response) {
    const user = await this.service.getByWhere({ where: { id: +req.params.id } })
    res.json(user)
  }

  private getAll = async (_: Request, res: Response) => {
    const users = await this.service.getAll()
    res.json(users)
  }
}

export default UserController
