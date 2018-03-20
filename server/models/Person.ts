import * as mongoose from 'mongoose';
import { prop, Typegoose } from 'typegoose';

export class Person extends Typegoose {
  @prop()
  firstName?: string;
    
  @prop()
  lastName?: string;
}

const PersonModel = new Person().getModelForClass(Person);

export default PersonModel;
