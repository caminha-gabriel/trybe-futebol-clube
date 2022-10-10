import createToken from '../utils/createToken.utils';
import User from '../database/models/user.model';
import IUserLoginInfo from '../interfaces/IUserLoginInfo';
import IServiceResponse from '../interfaces/IServiceResponse';
import { StatusCodes } from 'http-status-codes';
import * as bcrypt from 'bcryptjs';
import decodeToken from '../utils/decodeToken.utils';

export default class UserService {
  static async login(userLoginInfo: IUserLoginInfo): Promise<IServiceResponse> {
    const foundUser = await User.findOne({ where: { email: userLoginInfo.email }}) as User;
    let token: string | null;
    let emailIsValid;
    let passwordIsValid;
    
    if (foundUser) {
      emailIsValid = foundUser.email === userLoginInfo.email;
      passwordIsValid = bcrypt.compareSync(userLoginInfo.password, foundUser.password);
    }

    if (emailIsValid && passwordIsValid) {
      token = createToken('email', foundUser.email);
      return { code: Number(StatusCodes.OK), content: { token } };
    }

    return { code: Number(StatusCodes.UNAUTHORIZED), message: 'Incorrect email or password' };
  }

  static async validateAuth(authorization: string): Promise<IServiceResponse> {
    const decodedToken = decodeToken(authorization) as User;

    const foundUser = await User.findOne({ where: { email: decodedToken.email }});

    if (foundUser) return {
      code: Number(StatusCodes.OK),
      content: { role: foundUser.role }
    }

    return { code: StatusCodes.UNAUTHORIZED, content: { message: 'Invalid authorization token' }};
  }
}