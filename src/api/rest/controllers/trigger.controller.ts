import type { Request, Response } from 'express';
import { Router } from 'express';

import TriggerService from '#/services/trigger.service';

class TriggerController {
  public path = '/trigger';

  public router = Router();
  private service = new TriggerService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.getAll);
  }

  private getAll = async (_: Request, res: Response) => {
    const trigger = await this.service.getAll();
    res.json(trigger);
  };
}

export default TriggerController;
