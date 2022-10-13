import { Request, Response } from 'express';

export default interface ILeaderboardController {
  getAll(req: Request, res: Response): Promise<Response>;
};
