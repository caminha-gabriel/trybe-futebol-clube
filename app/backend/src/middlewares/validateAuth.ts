import decodeToken from '../utils/decodeToken.utils';
import User from '../database/models/user.model';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

export default async function validateAuth(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const decodedToken = decodeToken(authorization as string) as User;

  const foundUser = await User.findOne({ where: { email: decodedToken.email }});
  if (!foundUser) return res.status(Number(StatusCodes.UNAUTHORIZED)).json({ message: 'Invalid authorization token' });
  req.body.email = foundUser.email;
  next();
}
