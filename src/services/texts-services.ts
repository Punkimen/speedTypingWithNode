import {TextModel} from "../db/text-schemes";
import {ApiError} from "../exeptions/api-errors";

class TextsServices {
  async getTexts (id?: string) {
    if(id){
      const text = TextModel.findOne({id});
      if(!text){
        throw ApiError.BadRequest('Текст с таким id не найден');
      }
      return text;
    }else{
      const texts = TextModel.find();
      return texts;
    }
  }
}

export default new TextsServices();