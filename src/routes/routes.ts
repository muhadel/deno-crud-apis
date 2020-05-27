import { Router } from 'https://deno.land/x/oak/mod.ts';
import user from '../controllers/user.ts';

const router = new Router();
const baseUrl = '/api/v1/users';

router
  .get('/', async ctx => {
    ctx.response.body = { success: true, msg: 'ping' };
  })
  .get(`${baseUrl}`, user.getUsers)
  .get(`${baseUrl}/:id`, user.getUser)
  .post(`${baseUrl}`, user.createUser)
  .put(`${baseUrl}/:id`, user.updateUser)
  .delete(`${baseUrl}/:id`, user.deleteUser);

export default router;
