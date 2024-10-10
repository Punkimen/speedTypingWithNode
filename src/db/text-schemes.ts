import mongoose, {Schema} from 'mongoose';

const textScheme = new Schema( {
  _id: Schema.Types.ObjectId,
  text: String,
})

export const TextModel = mongoose.model('Texts', textScheme);
