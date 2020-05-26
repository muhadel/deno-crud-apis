import { RouterContext } from 'https://deno.land/x/oak/mod.ts';
import UserRepository from '../repos/user.ts';

class UserController {
  readonly userRepository = new UserRepository();

  createUser = async (ctx: RouterContext) => {
    try {
      const { request, response } = ctx;
      if (!request.hasBody) {
        response.status = 400;
        response.body = { msg: 'Invalid user data' };
        return;
      }
      const { value } = await request.body();
      ctx.response.body = await this.userRepository.insertOne(value);
    } catch (error) {
      ctx.response.body = 'Internal error';
    }
  };
  deleteUser = async (ctx: RouterContext) => {
    try {
      const {
        params: { id },
        response
      } = ctx;

      if (!id) {
        response.status = 400;
        response.body = { msg: 'Invalid user data' };
        return;
      }
      console.log('request', id);

      ctx.response.body = await this.userRepository.deleteOne(id);
    } catch (error) {
      ctx.response.body = 'Internal error';
    }
  };

  getUsers = async (ctx: RouterContext) => {
    try {
      ctx.response.body = await this.userRepository.find();
    } catch (error) {
      ctx.response.body = 'Internal error';
    }
  };
}
export default new UserController();
