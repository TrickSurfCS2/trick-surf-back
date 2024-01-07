import type { ErrorRequestHandler, NextFunction, Request, Response } from 'express'

/**
 * Error middleware function that handles errors in an Express application.
 * @param error - The error object that occurred.
 * @param request - The Express request object.
 * @param response - The Express response object.
 * @param next - The next middleware function.
 */
function errorMiddleware(
  error: ErrorRequestHandler,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const errorCode = response.statusCode || 500

  if (error instanceof Error) {
    console.error(error) // Log the error

    if (!response.headersSent) {
      response.status(errorCode).send({
        message: error.message,
        errorCode,
      })
    }
    else {
      next(error)
    }
  }
  else {
    if (!response.headersSent) {
      response.status(errorCode).send({
        message: 'Something went wrong',
        errorCode,
      })
    }
    else {
      next(error)
    }
  }
}

export default errorMiddleware
