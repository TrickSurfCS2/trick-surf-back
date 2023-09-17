import Server from './server';
import config from './config';

import validateEnv from './utils/validate-env';

const startServer = async () => {
  validateEnv();

  Server.import(config);
  Server.listen();
};

startServer();
