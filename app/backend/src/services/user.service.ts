import tokenProcess from '../utils/tokenProcess.utils';
import User from '../database/models/user.model';
import IUser from '../interfaces/IUser';
import IUserService from '../interfaces/IUserService';
import IServiceResponse from '../interfaces/IServiceResponse';
import { StatusCodes } from 'http-status-codes';

export default class UserService implements IUserService {
  private _userModel = User;

  async login(userInfo: IUser): Promise<IServiceResponse> {
    const foundUser = await this._userModel.findOne({ where: { email: userInfo.email }}) as IUser;
    let token: string | null;
    if (foundUser) {
      token = tokenProcess(userInfo.password, foundUser.password, { data: foundUser });
      if (token) {
        return { code: Number(StatusCodes.OK), content: token };
      }
    }
    return { code: Number(StatusCodes.UNAUTHORIZED), message: 'Incorrect email or password' };
  }
}