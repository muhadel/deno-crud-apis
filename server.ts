import { Application } from 'https://deno.land/x/oak/mod.ts';
import 'https://deno.land/x/dotenv/load.ts';
import { APP_HOST, APP_PORT } from './src/config/keys.ts';
import router from './src/routes/routes.ts';

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());
app.listen({ port: APP_PORT });

console.log(`Listening on http://${APP_HOST}:${APP_PORT}/`);
