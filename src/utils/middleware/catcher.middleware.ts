import type { NextFunction, Request, Response } from 'express'

function catcherMiddleware(fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next)
}
export { catcherMiddleware }
