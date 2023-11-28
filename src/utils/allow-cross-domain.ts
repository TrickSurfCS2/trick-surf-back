import type { NextFunction, Request, Response } from 'express'

// CORS middleware
export function allowCrossDomain(req: Request, res: Response, next: NextFunction) {
  res.header(`Access-Control-Allow-Origin`, `*`)
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`)
  res.header(`Access-Control-Allow-Headers`, `Content-Type, Accept`)
  next()
}
