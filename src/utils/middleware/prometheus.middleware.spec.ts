import type { Request, Response } from 'express'
import { PromCounterBrowser, PromCounterLocation, PromCounterRoute } from '#/utils/metrics'
import { describe, expect, it, vi } from 'vitest'
import { prometheusMiddleware } from './prometheus.middleware'

describe('prometheusMiddleware', () => {
  // Middleware increments counters for browser type, location, and route.
  it('should increment counters for browser type, location, and route', async () => {
    const request = {
      headers: {
        'user-agent': 'Chrome',
        'accept-language': 'en',
      },
      originalUrl: '/api/users',
    } as Request
    const response = {} as Response
    const next = vi.fn()

    prometheusMiddleware(request, response, next)

    const promCounterBrowser = await PromCounterBrowser.get()
    const promCounterLocation = await PromCounterLocation.get()
    const promCounterRoute = await PromCounterRoute.get()

    expect(promCounterBrowser.values[0].labels).toEqual({ browser: 'Chrome' })
    expect(promCounterLocation.values[0].labels).toEqual({ location: 'en' })
    expect(promCounterRoute.values[0].labels).toEqual({ route: '/api/users' })
    expect(next).toHaveBeenCalled()

    PromCounterBrowser.reset()
    PromCounterLocation.reset()
    PromCounterRoute.reset()
  })

  // If user agent is present, middleware extracts browser type and increments counter.
  it('should extract browser type and increment counter when user agent is present', async () => {
    const request = {
      headers: {
        'user-agent': 'Firefox',
        'accept-language': 'en',
      },
      originalUrl: '/api/users',
    } as Request
    const response = {} as Response
    const next = vi.fn()

    prometheusMiddleware(request, response, next)

    const promCounterBrowser = await PromCounterBrowser.get()
    const promCounterLocation = await PromCounterLocation.get()
    const promCounterRoute = await PromCounterRoute.get()

    expect(promCounterBrowser.values[0].labels).toEqual({ browser: 'Firefox' })
    expect(promCounterLocation.values[0].labels).toEqual({ location: 'en' })
    expect(promCounterRoute.values[0].labels).toEqual({ route: '/api/users' })
    expect(next).toHaveBeenCalled()

    PromCounterBrowser.reset()
    PromCounterLocation.reset()
    PromCounterRoute.reset()
  })

  // If accept language is present, middleware extracts location and increments counter.
  it('should extract location and increment counter when accept language is present', async () => {
    const request = {
      headers: {
        'user-agent': 'Firefox',
        'accept-language': 'fr',
      },
      originalUrl: '/api/users',
    } as Request
    const response = {} as Response
    const next = vi.fn()

    prometheusMiddleware(request, response, next)

    const promCounterBrowser = await PromCounterBrowser.get()
    const promCounterLocation = await PromCounterLocation.get()
    const promCounterRoute = await PromCounterRoute.get()

    expect(promCounterBrowser.values[0].labels).toEqual({ browser: 'Firefox' })
    expect(promCounterLocation.values[0].labels).toEqual({ location: 'fr' })
    expect(promCounterRoute.values[0].labels).toEqual({ route: '/api/users' })
    expect(next).toHaveBeenCalled()

    PromCounterBrowser.reset()
    PromCounterLocation.reset()
    PromCounterRoute.reset()
  })

  // User agent is not present, middleware sets browser type to 'Unknown'.
  it('should set browser type to "Unknown" when user agent is not present', async () => {
    const request = {
      headers: {
        'accept-language': 'en',
      },
      originalUrl: '/api/users',
    } as Request
    const response = {} as Response
    const next = vi.fn()

    prometheusMiddleware(request, response, next)

    const promCounterBrowser = await PromCounterBrowser.get()
    const promCounterLocation = await PromCounterLocation.get()
    const promCounterRoute = await PromCounterRoute.get()

    expect(promCounterBrowser.values[0].labels).toEqual({ browser: 'Unknown' })
    expect(promCounterLocation.values[0].labels).toEqual({ location: 'en' })
    expect(promCounterRoute.values[0].labels).toEqual({ route: '/api/users' })
    expect(next).toHaveBeenCalled()

    PromCounterBrowser.reset()
    PromCounterLocation.reset()
    PromCounterRoute.reset()
  })

  // Accept language is not present, middleware sets location to 'Unknown'.
  it('should set location to "Unknown" when accept language is not present', async () => {
    const request = {
      headers: {
        'user-agent': 'Chrome',
      },
      originalUrl: '/api/users',
    } as Request
    const response = {} as Response
    const next = vi.fn()

    prometheusMiddleware(request, response, next)

    const promCounterBrowser = await PromCounterBrowser.get()
    const promCounterLocation = await PromCounterLocation.get()
    const promCounterRoute = await PromCounterRoute.get()

    expect(promCounterBrowser.values[0].labels).toEqual({ browser: 'Chrome' })
    expect(promCounterLocation.values[0].labels).toEqual({ location: 'Unknown' })
    expect(promCounterRoute.values[0].labels).toEqual({ route: '/api/users' })
    expect(next).toHaveBeenCalled()

    PromCounterBrowser.reset()
    PromCounterLocation.reset()
    PromCounterRoute.reset()
  })

  // Route is not present, middleware does not increment counter for route.
  it('should not increment counter for route when route is not present', async () => {
    const request = {
      headers: {
        'user-agent': 'Chrome',
        'accept-language': 'en',
      },
    } as Request
    const response = {} as Response
    const next = vi.fn()

    prometheusMiddleware(request, response, next)

    const promCounterBrowser = await PromCounterBrowser.get()
    const promCounterLocation = await PromCounterLocation.get()
    const promCounterRoute = await PromCounterRoute.get()

    expect(promCounterBrowser.values[0].labels).toEqual({ browser: 'Chrome' })
    expect(promCounterLocation.values[0].labels).toEqual({ location: 'en' })
    expect(promCounterRoute.values[0]).toEqual(undefined)
    expect(next).toHaveBeenCalled()

    PromCounterBrowser.reset()
    PromCounterLocation.reset()
    PromCounterRoute.reset()
  })
})
