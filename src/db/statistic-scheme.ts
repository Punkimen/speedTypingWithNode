import mongoose, {Schema} from 'mongoose';
import {LessonModel} from "./lesson-scheme";

const statisticScheme = new Schema({
  // _id: Schema.Types.ObjectId,
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
})

statisticScheme.virtual('total_success_percent').get(async function () {
  const lessons = await LessonModel.find({user_id: this?.user_id});
  if (lessons.length === 0 || !lessons) return 0;
  const totalSuccess = lessons.reduce((sum, lesson) => sum + (lesson?.success_percent || 0), 0);
  return totalSuccess / lessons.length;
});

statisticScheme.virtual('total_accuracy').get(async function () {
  const lessons = await LessonModel.find({user_id: this?.user_id});
  if (lessons.length === 0 || !lessons) return 0;
  const totalAccuracy = lessons.reduce((sum, lesson) => sum + (lesson?.accuracy || 0), 0);
  return totalAccuracy / lessons.length;
});

//Методы toObject и toJSON: Эти методы нужны, чтобы виртуальные поля отображались
// при конвертации схемы в JSON или при передаче данных через API.
statisticScheme.set('toObject', { virtuals: true });
statisticScheme.set('toJSON', { virtuals: true });

export const StatsModel = mongoose.model('Stats', statisticScheme);