import { Router } from 'https://deno.land/x/oak/mod.ts';
import user from '../controllers/user.ts';

const router = new Router();
router
  .get('/', async ctx => {
    ctx.response.body = { success: true, message: 'ping' };
  })
  .post('/api/v1/users', user.createUser)
  .get('/api/v1/users', user.getUsers)
  .delete('/api/v1/users/:id', user.deleteUser);

export default router;
