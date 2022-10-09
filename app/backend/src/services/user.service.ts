import tokenProcess from '../utils/tokenProcess.utils';
import User from '../database/models/user.model';
import IUserLoginInfo from '../interfaces/IUserLoginInfo';
import IServiceResponse from '../interfaces/IServiceResponse';
import { StatusCodes } from 'http-status-codes';

export default class UserService {
  static async login(userLoginInfo: IUserLoginInfo): Promise<IServiceResponse> {
    const foundUser = await User.findOne({ where: { email: userLoginInfo.email }}) as User;
    let token: string | null;
    if (foundUser) {
      token = tokenProcess(userLoginInfo.password, foundUser.password, { data: foundUser });
      if (token) {
        return { code: Number(StatusCodes.OK), content: { token } };
      }
    }
    return { code: Number(StatusCodes.UNAUTHORIZED), message: 'Incorrect email or password' };
  }
}