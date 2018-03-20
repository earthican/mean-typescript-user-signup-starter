import * as mongoose from 'mongoose';
import { prop } from 'typegoose';

import { Person } from './Person';

export class User extends Person {
  @prop({ unique: true, index: true })
  email: string

  @prop()
  passwordHash: string

  @prop()
  affiliationId: string
}

const UserModel = new User().getModelForClass(User, { existingMongoose: mongoose });

export default UserModel;
