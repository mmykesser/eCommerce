import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  mongoURI: string;
  jwtSecret: string;
}

const getEnvVariable = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is required!`);
  }
  return value;
};

const config: Config = {
  port: parseInt(getEnvVariable('PORT'), 10),
  mongoURI: getEnvVariable('MONGODB_URI'),
  jwtSecret: getEnvVariable('JWT_SECRET'),
};

export default config;
