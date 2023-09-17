import type { Application } from 'express';
import UserController from '#/api/rest/controllers/user.controller';
import TrickController from '#/api/rest/controllers/trick.controller';
import TriggerController from '#/api/rest/controllers/trigger.controller';

const controllers = [
  {
    basePath: '/api/v1',
    controller: new UserController()
  },
  {
    basePath: '/api/v1',
    controller: new TrickController()
  },
  {
    basePath: '/api/v1',
    controller: new TriggerController()
  }
];

export const setupRoutes = (server: Application) => {
  controllers.forEach(({ basePath, controller: { router } }) => {
    server.use(basePath, router);
  });
};
