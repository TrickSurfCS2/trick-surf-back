import type { NextFunction, Request, Response } from 'express'
import { PromCounterBrowser, PromCounterLocation, PromCounterRoute } from '#/utils/metrics'

/**
 * Middleware function for Prometheus metrics.
 * Increments counters for browser type, location, and route.
 *
 * @param request - The Express request object.
 * @param response - The Express response object.
 * @param next - The next middleware function.
 */
function prometheusMiddleware(request: Request, response: Response, next: NextFunction) {
  const { headers, originalUrl: route } = request

  const userAgent = headers['user-agent']
  const acceptLanguage = headers['accept-language']

  // Извлечение типа браузера
  const browserRegex = /Chrome|Firefox|Safari|Opera|IE|Edge|Yandex|UCBrowser/i
  const browserMatch = userAgent?.match(browserRegex)
  const browser = browserMatch?.[0] ?? 'Unknown'

  if (browser)
    PromCounterBrowser.inc({ browser })

  // Извлечение локации
  const locationRegex = /ru|en|fr|de|es/i
  const locationMatch = acceptLanguage?.match(locationRegex)
  const location = locationMatch?.[0] ?? 'Unknown'

  if (location)
    PromCounterLocation.inc({ location })

  if (route)
    PromCounterRoute.inc({ route })

  next()
}

export default prometheusMiddleware
