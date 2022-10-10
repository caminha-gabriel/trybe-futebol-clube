import { Request, Response } from 'express';
import IUserLoginInfo from '../interfaces/IUserLoginInfo';
import IUserController from '../interfaces/IUserController';
import UserService from '../services/user.service';

export default class UserController implements IUserController {
  public async login(req: Request, res: Response): Promise<Response> {
    const { message, code, content } = await UserService.login(req.body as IUserLoginInfo);
    
    if (message) {
      return res.status(code).json({ message });
    }
    return res.status(code).json(content);
  }
   
  public async validateRole(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const { message, code, content } = await UserService.validateRole(email);

    if (message) {
      return res.status(code).json({ message });
    }
    return res.status(code).json(content);
  }
}