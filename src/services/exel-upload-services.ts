import xlsx from "xlsx";
import {TextModel} from "../db/text-schemes";
import {ApiError} from "../exeptions/api-errors";

class exelUploadServices {
  async uploadToDb(path: string) {
    const file = xlsx.readFile(path);
    const sheets = file.SheetNames;
    const data:{id: number, text: string}[] = xlsx.utils.sheet_to_json(file.Sheets[sheets[0]]);
    try {
      const promisses = data.map(el => TextModel.create({id: el.id.toString(), text: el.text}));
      return Promise.all(promisses);
    } catch (e) {
      throw ApiError.BadRequest('Не удалось загрузить данные', [e]);
    }
  }
}

export default new exelUploadServices();