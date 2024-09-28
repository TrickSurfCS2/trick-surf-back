import type { ErrorRequestHandler, Request, Response } from 'express'
import { describe, expect, it, vi } from 'vitest'
import { errorMiddleware } from './error.middleware'

describe('errorMiddleware', () => {
  // Handles an Error object and sends a response with status code and error message.
  it('should handle an Error object and send a response with status code and error message', () => {
    const error = new Error('Test error') as unknown as ErrorRequestHandler
    const request = {} as Request
    const response = {
      statusCode: 400,
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
      headersSent: false,
    }
    const next = vi.fn()

    errorMiddleware(error, request, response as unknown as Response, next)

    expect(response.status).toHaveBeenCalledWith(400)
    expect(response.send).toHaveBeenCalledWith({
      message: 'Test error',
      errorCode: 400,
    })
    expect(next).not.toHaveBeenCalled()
  })

  // Handles a non-Error object and sends a response with status code and default error message.
  it('should handle a non-Error object and send a response with status code and default error message', () => {
    const error = 'Test error' as unknown as ErrorRequestHandler
    const request = {} as Request
    const response = {
      statusCode: 400,
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
      headersSent: false,
    }
    const next = vi.fn()

    errorMiddleware(error, request, response as unknown as Response, next)

    expect(response.status).toHaveBeenCalledWith(400)
    expect(response.send).toHaveBeenCalledWith({
      message: 'Something went wrong',
      errorCode: 400,
    })
    expect(next).not.toHaveBeenCalled()
  })

  // Calls the next middleware function if headers have already been sent.
  it('should call the next middleware function if headers have already been sent', () => {
    const error = new Error('Test error') as unknown as ErrorRequestHandler
    const request = {} as Request
    const response = {
      statusCode: 400,
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
      headersSent: true,
    }
    const next = vi.fn()

    errorMiddleware(error, request, response as unknown as Response, next)

    expect(response.status).not.toHaveBeenCalled()
    expect(response.send).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalledWith(error)
  })

  // Handles an undefined error object and sends a response with status code and default error message.
  it('should handle an undefined error object and send a response with status code and default error message', () => {
    const error = undefined as unknown as ErrorRequestHandler
    const request = {} as Request
    const response = {
      statusCode: 500,
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
      headersSent: false,
    }
    const next = vi.fn()

    errorMiddleware(error, request, response as unknown as Response, next)

    expect(response.status).toHaveBeenCalledWith(500)
    expect(response.send).toHaveBeenCalledWith({
      message: 'Something went wrong',
      errorCode: 500,
    })
    expect(next).not.toHaveBeenCalled()
  })

  // Handles an error object with no message property and sends a response with status code and default error message.
  it('should handle an error object with no message property and send a response with status code and default error message', () => {
    const error = { code: 123 } as unknown as ErrorRequestHandler
    const request = {} as Request
    const response = {
      statusCode: 500,
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
      headersSent: false,
    } as unknown as Response
    const next = vi.fn()

    errorMiddleware(error, request, response as unknown as Response, next)

    expect(response.status).toHaveBeenCalledWith(500)
    expect(response.send).toHaveBeenCalledWith({
      message: 'Something went wrong',
      errorCode: 500,
    })
    expect(next).not.toHaveBeenCalled()
  })

  // Handles an error object with no status code property and sends a response with default status code.
  it('should handle an error object with no status code property and send a response with default status code', () => {
    const error = new Error('Test error') as unknown as ErrorRequestHandler
    const request = {} as Request
    const response = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
      headersSent: false,
    }
    const next = vi.fn()

    errorMiddleware(error, request, response as unknown as Response, next)

    expect(response.status).toHaveBeenCalledWith(500)
    expect(response.send).toHaveBeenCalledWith({
      message: 'Test error',
      errorCode: 500,
    })
    expect(next).not.toHaveBeenCalled()
  })
})
