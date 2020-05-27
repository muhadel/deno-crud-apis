import { Application } from 'https://deno.land/x/oak/mod.ts';
import { APP_HOST, APP_PORT } from './src/config/keys.ts';
import router from './src/routes/routes.ts';

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());
app.use(async ({ response }, next) => {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  response.headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  await next();
});

app.listen(`${APP_HOST}:${APP_PORT}`);
console.log(`Listening on http://${APP_HOST}:${APP_PORT}/`);
