import mongoose, {Schema} from 'mongoose';

const lessonScheme = new Schema({
  // _id: Schema.Types.ObjectId,
  success_percent: Number,
  accuracy: Number,
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  // text_id: {type: Schema.Types.ObjectId, ref: 'Texts'}
})

export const LessonModel = mongoose.model('Lesson', lessonScheme);