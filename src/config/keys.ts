import { config } from 'https://deno.land/x/dotenv/mod.ts';
const env = config();

export const APP_HOST = env.APP_HOST || 'localhost';
export const APP_PORT = env.APP_PORT || 4242;
export const DB_NAME = env.DB_NAME || 'deno_demo';
export const DB_HOST = env.DB_HOST || 'mongodb://localhost:27017';
