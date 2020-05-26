export const APP_HOST = Deno.env.get('APP_HOST') || 'localhost';
export const APP_PORT = 8000;
export const DB_NAME = Deno.env.get('DB_NAME') || 'deno_demo';
export const DB_HOST = Deno.env.get('DB_HOST') || 'mongodb://localhost:27017';
