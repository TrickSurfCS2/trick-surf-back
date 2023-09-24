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

  private getAll = async (req: Request, res: Response) => {
    const { mapId, name, fullName, id } = req.query;

    const where = {
      id: id ? +id : undefined,
      mapId: mapId ? +mapId : undefined,
      name: name ? `${name}` : undefined,
      fullName: fullName ? `${fullName}` : undefined
    };

    const trigger = await this.service.getAllByWhere({ where });
    res.json(trigger);
  };
}

export default TriggerController;
