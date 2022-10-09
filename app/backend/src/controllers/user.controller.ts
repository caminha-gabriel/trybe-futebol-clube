import { Request, Response } from 'express';
import IUser from '../interfaces/IUser';
import IUserController from '../interfaces/IUserController';
import IUserService from '../interfaces/IUserService';

export default class UserController implements IUserController {
  constructor(private _userService: IUserService) { }

  async login(req: Request, res: Response): Promise<Response> {
    const { message, code, content } = await this._userService.login(req.body as IUser);

    if (message) {
      return res.status(code).json({ message });
    }
    return res.status(code).json(content);
  }
}