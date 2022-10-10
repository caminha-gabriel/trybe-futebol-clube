import { Request, Response } from 'express';
import IUserLoginInfo from '../interfaces/IUserLoginInfo';
import IUserController from '../interfaces/IUserController';
import UserService from '../services/user.service';
import { StatusCodes } from 'http-status-codes';

export default class UserController implements IUserController {
  public async login(req: Request, res: Response): Promise<Response> {
    const { message, code, content } = await UserService.login(req.body as IUserLoginInfo);
    
    if (message) {
      return res.status(code).json({ message });
    }
    return res.status(code).json(content);
  }
   
  public async validateAuth(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;

    if (!authorization) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid authorization token' });
    
    const { message, code, content } = await UserService.validateAuth(authorization);

    if (message) {
      return res.status(code).json({ message });
    }
    return res.status(code).json(content);
  }
}