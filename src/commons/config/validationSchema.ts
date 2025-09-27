import * as joi from 'joi';
import { EnvironmentEnum } from './configApp';

export const validationSchema = joi.object({
  NODE_ENV: joi.string().default(EnvironmentEnum.DEV),
  DB_HOST: joi.string(),
  DB_PORT: joi.number().default(3000),
  DB_USER: joi.string().required(),
  DB_PASS: joi.string().required(),
  DB_NAME: joi.string().required(),
  CONTENTFUL_SPACE: joi.string().required(),
  CONTENTFUL_ENVIRONMENT: joi.string().required(),
  CONTENTFUL_ACCESS_TOKEN: joi.string().required(),
  CONTENTFUL_BASE_URL: joi.string().required(),
  JWT_SECRET: joi.string().required(),
  JWT_EXPIRES_IN_SECONDS: joi.number().required(),
});
