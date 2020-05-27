import { RouterContext } from 'https://deno.land/x/oak/mod.ts';
import UserRepository from '../repos/user.ts';

class UserController {
  readonly userRepository = new UserRepository();

  getUsers = async (ctx: RouterContext) => {
    try {
      const users = await this.userRepository.findAllUsers();
      ctx.response.status = 200;
      ctx.response.body = { success: true, data: users };
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = 'Internal error';
    }
  };

  getUser = async ({ response, params: { id } }: RouterContext) => {
    try {
      if (!id) {
        response.status = 400;
        response.body = { success: false, error: 'Id params is required' };
        return;
      }
      const user = await this.userRepository.findOne(id);

      if (!user) {
        response.status = 404;
        response.body = { success: false, error: 'User not found' };
        return;
      }
      response.status = 200;
      response.body = { success: true, data: user };
    } catch (error) {
      response.status = 500;
      response.body = 'Internal error';
    }
  };

  createUser = async ({ request, response }: any) => {
    try {
      if (!request.hasBody) {
        response.status = 400;
        response.body = { success: false, error: 'Invalid user data' };
        return;
      }
      const {
        value: { name, age }
      } = await request.body();
      if (!name || !age) {
        response.status = 422;
        response.body = { success: false, error: 'Invalid user data' };
        return;
      }
      const user = await this.userRepository.insertOne({ name, age });
      response.status = 201;
      response.body = { success: true, data: user };
    } catch (error) {
      response.status = 500;
      response.body = 'Internal error';
    }
  };

  updateUser = async ({ request, response, params: { id } }: any) => {
    try {
      if (!id) {
        response.status = 400;
        response.body = { success: false, error: 'Id params is required' };
        return;
      }
      if (!request.hasBody) {
        response.status = 400;
        response.body = { success: false, error: 'Invalid user data' };
        return;
      }
      const {
        value: { name, age }
      } = await request.body();

      const user = await this.userRepository.findOne(id);
      if (!user) {
        response.status = 404;
        response.body = { success: false, error: 'User not found' };
        return;
      }
      const { modifiedCount } = await this.userRepository.updateOne(id, { name, age });
      if (modifiedCount === 1) {
        response.status = 200;
        response.body = { success: true, msg: 'User updated successfully!' };
      } else {
        response.status = 400;
        response.body = { success: false, error: 'Something went wrong!' };
      }
    } catch (error) {
      response.status = 500;
      response.body = 'Internal error';
    }
  };
  deleteUser = async ({ response, params: { id } }: RouterContext) => {
    try {
      if (!id) {
        response.status = 400;
        response.body = { success: false, error: 'Invalid user data' };
        return;
      }
      const user = await this.userRepository.findOne(id);
      if (!user) {
        response.status = 404;
        response.body = { success: false, error: 'User not found' };
        return;
      }

      await this.userRepository.deleteOne(id);

      response.status = 200;
      response.body = { success: true, message: 'User deleted successfully' };
    } catch (error) {
      response.status = 500;
      response.body = 'Internal error';
    }
  };
}
export default new UserController();
