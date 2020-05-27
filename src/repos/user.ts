import db from '../config/mongodb.ts';
import { IUser } from '../types/user.ts';

export default class UserRepository {
  constructor() {}
  readonly userCollection = db.collection('users');

  async findAllUsers(): Promise<IUser[]> {
    return this.userCollection.find();
  }

  async insertOne(user: IUser): Promise<IUser | undefined> {
    return this.userCollection.insertOne(user);
  }
  async findOne(userId: string): Promise<IUser | undefined> {
    return this.userCollection.findOne({ _id: { $oid: userId } });
  }

  async updateOne(userId: string, user: IUser): Promise<IUser | any> {
    return this.userCollection.updateOne(
      { _id: { $oid: userId } },
      {
        $set: {
          name: user.name,
          age: user.age
        }
      }
    );
  }

  async deleteOne(userId: string) {
    return this.userCollection.deleteOne({ _id: { $oid: userId } });
  }
}
