import mongoose, {Schema} from 'mongoose';

const userScheme = new Schema({
  email: String,
  password: String,
  isActivated: Boolean,
  activatedLink: String,
});

export const UserModel = mongoose.model('User', userScheme);

