import dotenv from 'dotenv';

dotenv.config();

const required = (value: string | undefined, key: string) => {
  if (!value) {
    throw new Error(`Missing required env var: ${key}`);
  }
  return value;
};

export const env = {
  port: Number(process.env.PORT || 4000),
  databaseUrl: required(process.env.DATABASE_URL, 'DATABASE_URL'),
  jwtSecret: required(process.env.JWT_SECRET, 'JWT_SECRET'),
  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS || 10),
  nodeEnv: process.env.NODE_ENV || 'development',
};
