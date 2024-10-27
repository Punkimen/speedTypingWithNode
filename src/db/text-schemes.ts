import mongoose, {Schema} from 'mongoose';

const textScheme = new Schema( {
  id: String,
  text: String,
})

export const TextModel = mongoose.model('Texts', textScheme);
