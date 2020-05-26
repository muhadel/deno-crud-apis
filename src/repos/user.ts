import db from '../config/mongodb.ts';
import { IUser } from '../types/user.ts';

export default class UserRepository {
  constructor() {}
  readonly userCollection = db.collection('users');

  async find(): Promise<any> {
    return this.userCollection.find();
  }

  async insertOne(user: IUser) {
    return this.userCollection.insertOne(user);
  }

  async deleteOne(id: string) {
    return this.userCollection.deleteOne({ _id: id });
  }
}
