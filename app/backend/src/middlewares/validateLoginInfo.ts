import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export default function validateLoginInfo(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  const fieldMissingMsg = { message: 'All fields must be filled' };

  if (!email || !password) return res.status(StatusCodes.BAD_REQUEST).json(fieldMissingMsg);
  next();
}