import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export default function validateTeamsDistinction(req: Request, res: Response, next: NextFunction) {
  const { homeTeam, awayTeam, } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(Number(StatusCodes.UNAUTHORIZED)).json({ message: 'It is not possible to create a match with two equal teams' });
  }

  next();
}