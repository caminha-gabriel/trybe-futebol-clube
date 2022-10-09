import IServiceResponse from './IServiceResponse';
import IUser from './IUser';

export default interface IUserService {
  login(userInfo: IUser): Promise<IServiceResponse>;
};
