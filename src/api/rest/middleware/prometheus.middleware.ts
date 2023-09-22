import type { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { PromCounterBrowser, PromCounterLocation, PromCounterRoute } from '#/utils/metrics';

const prometheusMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const { headers, originalUrl: route } = request;

  const userAgent = headers['user-agent'];
  const acceptLanguage = headers['accept-language'];

  if (userAgent) {
    // Извлечение типа браузера
    const browserRegex = /(?:Chrome|Firefox|Safari|Opera|IE|Edge|Yandex|UCBrowser)/i;
    const browserMatch = userAgent.match(browserRegex);
    const browser = browserMatch ? browserMatch[0] : 'Unknown';

    if (browser) {
      PromCounterBrowser.inc({ browser });
    }
  }

  if (acceptLanguage) {
    // Извлечение локации
    const locationRegex = /(?:ru|en|fr|de|es)/i;
    const locationMatch = acceptLanguage.match(locationRegex);
    const location = locationMatch ? locationMatch[0] : 'Unknown';

    if (location) {
      PromCounterLocation.inc({ location });
    }
  }

  if (route) {
    PromCounterRoute.inc({ route });
  }

  next();
};

export default prometheusMiddleware;
