import { cleanEnv, num, port, str } from 'envalid';

function validateEnv() {
  cleanEnv(process.env, {
    PORT: port(),
    DATABASE_URL: str(),
    REDIS_PORT: port(),
    REDIS_HOST: str(),
    REDIS_USERNAME: str(),
    REDIS_PASSWORD: str(),
    REDIS_DB: num()
  });
}

export default validateEnv;
