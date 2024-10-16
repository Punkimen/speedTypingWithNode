import mongoose, {Schema} from 'mongoose';

const tokenScheme = new Schema({
  refreshToken: String,
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
});

export const TokenModel = mongoose.model('Token', tokenScheme);