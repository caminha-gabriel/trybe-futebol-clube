import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';
import ILeaderboardController from '../interfaces/ILeaderboardController';

export default class LeaderboardController implements ILeaderboardController {
  public async getAll(_req: Request, res: Response): Promise<Response> {
    const { message, code, content } = await LeaderboardService.getAll();

    if (message) {
      return res.status(code).json({ message });
    }

    return res.status(code).json(content);
  }
}