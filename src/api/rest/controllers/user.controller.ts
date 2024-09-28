import type { Request, Response } from 'express'
import type AController from '../interfaces/controller.interface'
import UserService from '#/services/user.service'

import { catcherMiddleware, validateRequest } from '#/utils/middleware'
import { Router } from 'express'
import { param } from 'express-validator'

class UserController implements AController {
  private service = new UserService()

  public router = Router()
  public path = '/user'

  constructor() {
    this.router.get(`${this.path}/`, catcherMiddleware(this.getAll))
    this.router.get(`${this.path}/:id`, [
      param('id').isInt().toInt(),
      validateRequest,
    ], catcherMiddleware(this.getById))
    this.router.get(`${this.path}/:id/permisson`, [
      param('id').isInt().toInt(),
      validateRequest,
    ], catcherMiddleware(this.getPermissionsByUserId))
  }

  getById = async (req: Request, res: Response) => {
    const user = await this.service.getByWhere({ where: { id: +req.params.id } })

    if (!user)
      res.status(404).json({ error: 'User not found' })
    else
      res.json(user)
  }

  private getAll = async (_: Request, res: Response) => {
    const users = await this.service.getAll()
    res.json(users)
  }

  private getPermissionsByUserId = async (req: Request, res: Response) => {
    const users = await this.service.getPermissionsByUserId(+req.params.id)
    res.json(users)
  }
}

export { UserController }

export default UserController
