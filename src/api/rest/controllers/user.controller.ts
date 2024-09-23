import type { Request, Response } from 'express'
import type AController from '../interfaces/controller.interface'
import UserService from '#/services/user.service'

import { validateRequest } from '#/utils/middleware/validate.middleware'
import { Router } from 'express'
import { param } from 'express-validator'

class UserController implements AController {
  private service = new UserService()

  public router = Router()
  public path = '/user'

  constructor() {
    this.router.get(`${this.path}/`, this.getAll)
    this.router.get(`${this.path}/:id`, [
      param('id').isInt().toInt(),
      validateRequest,
    ], this.getById)
  }

  getById = async (req: Request, res: Response) => {
    try {
      const user = await this.service.getByWhere({ where: { id: +req.params.id } })
      if (!user)
        res.status(404).json({ error: 'User not found' })

      else
        res.json(user)
    }
    catch {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  private getAll = async (_: Request, res: Response) => {
    try {
      const users = await this.service.getAll()
      res.json(users)
    }
    catch {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export { UserController }

export default UserController
