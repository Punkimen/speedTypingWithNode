import {UserData} from "../models/users.modesl";
import {ApiError} from "../exeptions/api-errors";
import {UserModel} from "../db/user-scheme";
import bcrypt from "bcrypt";
import {tokenServices} from "./token.services";

class AuthServices {
  async registration(data: UserData) {
    const {email, password} = data;
    if(!email || !password){
      throw ApiError.BadRequest('Неверные данные');
    }

    const userWithEmail = await UserModel.findOne({email});
    if(userWithEmail) {
      throw ApiError.BadRequest('Пользователь с таким email уже существует');
    }

    const hashPassword = await bcrypt.hash(password, 3);

    const newUser = await UserModel.create({email, password: hashPassword});
    if (!newUser) {
      throw ApiError.BadRequest('Ошибка при создании пользователя');
    }

    const tokens = tokenServices.createToken({id: newUser._id});
    await tokenServices.saveToken(newUser._id, tokens.refreshToken);

    return {...tokens, newUser}
  }

  async login (data: UserData) {
    const {email, password} = data;
    if(!email || !password){
      throw ApiError.BadRequest('Неверные данные');
    }

    const user = await UserModel.findOne({email});
    if (!user) {
      throw ApiError.BadRequest('Неверный логин или пароль');
    }
    const userHashPass = user.password;
    const isRightPass = await bcrypt.compare(password, userHashPass);

    if (!isRightPass) {
      throw ApiError.BadRequest('Неверный логин или пароль');
    }

    const tokens = tokenServices.createToken({id: user._id});
    await tokenServices.saveToken(user._id, tokens.refreshToken);

    return {...tokens, user}
  }

  async logout(refreshToken?: string) {
    if(!refreshToken){
      throw ApiError.UnauthorizedError();
    }

    return await tokenServices.deleteToken(refreshToken);
  }
}

export default new AuthServices();