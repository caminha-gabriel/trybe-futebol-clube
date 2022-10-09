import CustomError from "../errors/CustomError";
import { Request, Response } from "express";
import { NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export default function errorMiddleware(err: CustomError, _req: Request, res: Response, _next: NextFunction) {
  const { status, message } = err;

  if (!status) return res.status(Number(StatusCodes.INTERNAL_SERVER_ERROR)).json({ message: 'An internal error occurred' });
  return res.status(status).json({ message });
}