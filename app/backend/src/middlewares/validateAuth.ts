import decodeToken from '../utils/decodeToken.utils';
import User from '../database/models/user.model';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

export default async function validateAuth(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  let decodedTokenUser;

  try {
    decodedTokenUser = decodeToken(authorization as string) as User;
  } catch (error) {
    return res.status(Number(StatusCodes.UNAUTHORIZED)).json({ message: 'Token must be a valid token' });
  }

  const foundUser = await User.findOne({ where: { email: decodedTokenUser.email }});
  if (!foundUser) return res.status(Number(StatusCodes.UNAUTHORIZED)).json({ message: 'Content not found' });
  req.body.email = foundUser.email;
  next();
}
