import 'dotenv-safe/config';
import { IConfig } from '../interfaces/config.types';

const getEnvVariable = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is required!`);
  }
  return value;
};

const config: IConfig = {
  port: parseInt(getEnvVariable('PORT'), 10),
  mongoURI: getEnvVariable('MONGODB_URI'),
  jwtSecret: getEnvVariable('JWT_SECRET'),
};

export default config;
