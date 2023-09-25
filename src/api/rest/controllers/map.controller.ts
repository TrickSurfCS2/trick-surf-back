import type { Request, Response } from 'express';
import { Router } from 'express';

import MapService from '#/services/map.service';

class MapController {
  public path = '/map';

  public router = Router();
  private service = new MapService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.getAll);
  }

  private getAll = async (_: Request, res: Response) => {
    const data = await this.service.getAll();
    res.json(data);
  };
}

export default MapController;
