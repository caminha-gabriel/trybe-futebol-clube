import { Request, Response } from 'express';
import MatchService from '../services/match.service';
import IMatchController from '../interfaces/IMatchController';

export default class MatchController implements IMatchController {
  public async getAll(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;

    const { message, code, content } = await MatchService.getAll(inProgress as string);

    if (message) {
      return res.status(code).json({ message });
    }

    return res.status(code).json(content);
  }

  public async saveMatch(req: Request, res: Response): Promise<Response> {
    const { body: match } = req;

    const { message, code, content } = await MatchService.saveMatch(match);

    if (message) {
      return res.status(code).json({ message });
    }

    return res.status(code).json(content);
  }
}