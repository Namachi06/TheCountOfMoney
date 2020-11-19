import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface UserDocument extends mongoose.Document
{
  name:string;
  email:string;
  password:string;
  address:string;
  isAdmin:boolean;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    dropDrups: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const userModel = mongoose.model<UserDocument>('User', userSchema);

userSchema.plugin(uniqueValidator);

export default userModel;
