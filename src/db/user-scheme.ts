
import mongoose, {Schema} from 'mongoose';

const userScheme = new Schema({
  name: String,
  password: String,
});

export const UserModel = mongoose.model('User', userScheme);

