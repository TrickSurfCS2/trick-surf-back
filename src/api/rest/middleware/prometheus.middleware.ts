import type { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { PromCounterBrowser, PromCounterLocation, PromCounterRoute } from '#/utils/metrics';

const prometheusMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const { headers, originalUrl: route } = request;

  const userAgent = headers['user-agent'];
  const acceptLanguage = headers['accept-language'];

  // Извлечение типа браузера
  const browserRegex = /(?:Chrome|Firefox|Safari|Opera|IE|Edge|Yandex|UCBrowser)/i;
  const browserMatch = userAgent.match(browserRegex);
  const browser = browserMatch ? browserMatch[0] : 'Unknown';

  // Извлечение локации
  const locationRegex = /(?:ru|en|fr|de|es)/i;
  const locationMatch = acceptLanguage.match(locationRegex);
  const location = locationMatch ? locationMatch[0] : 'Unknown';

  if (route) {
    PromCounterRoute.inc({ route });
  }

  if (location) {
    PromCounterLocation.inc({ location });
  }

  if (browser) {
    PromCounterBrowser.inc({ browser });
  }

  next();
};

export default prometheusMiddleware;