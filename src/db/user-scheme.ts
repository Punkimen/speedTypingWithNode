import mongoose, {Schema} from 'mongoose';

const userScheme = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  isActivated: Boolean,
  activatedLink: String,
});

export const UserModel = mongoose.model('User', userScheme);

