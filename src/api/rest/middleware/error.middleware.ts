import type { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

function errorMiddleware(
  error: ErrorRequestHandler,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const errorCode = response.statusCode || 500;

  response.status(errorCode).send({
    message: 'Something went wrong',
    errorCode
  });
}

export default errorMiddleware;
