import { ConfigService } from '@nestjs/config';

export const getStringEnv = (config: ConfigService, key: string): string => {
  const val = config.get<string>(key);
  if (typeof val !== 'string' || val === undefined) {
    throw new Error(`Missing or invalid env variable: ${key}`);
  }
  return val;
};
