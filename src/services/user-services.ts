import {UserModel} from "../db/user-scheme";
import {ApiError} from "../exeptions/api-errors";
import {UserData} from "../models/users.modesl";

class UserServices {
  async getUser(id?: string) {
    if(id){
      const user = await UserModel.findOne({_id: id});
      if(!user){
        throw ApiError.BadRequest('Пользователь не найден');
      }
      return user;
    }else{
      const users = await UserModel.find();
      if(!users){
        throw ApiError.BadRequest('Пользователи не найдены');
      }
      return users;
    }
  }

  async createUser(data: UserData) {
    const {email, password} = data;
    if(!email || !password){
      throw ApiError.BadRequest('Не передан email или пароль')
    }

    const checkEmail = await UserModel.findOne({email});
    if(checkEmail){
      throw ApiError.BadRequest('Пользователь с таким email уже существует');
    }
    const createdUser = await UserModel.create({email, password});

    if(!createdUser){
      throw ApiError.BadRequest('Ошибка создания пользователя', createdUser);
    }

    return createdUser;
  }

  async deleteUser(id?: string){
    if(!id){
      throw ApiError.BadRequest('Не передан id');
    }
    const deletedUser = await UserModel.deleteOne({_id: id});
    if (!deletedUser) {
      throw ApiError.BadRequest('Пользователь не найден');
    }

    return deletedUser;
  }
}

export default new UserServices();