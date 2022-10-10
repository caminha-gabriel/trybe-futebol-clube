import { Request, Response } from 'express';
import TeamService from '../services/team.service';
import ITeamController from '../interfaces/ITeamController';

export default class TeamController implements ITeamController {
  public async getAll(_req: Request, res: Response): Promise<Response> {
    const { message, code, content } = await TeamService.getAll();

    if (message) {
      return res.status(code).json({ message });
    }

    return res.status(code).json(content);
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const { message, code, content } = await TeamService.findById(Number(id));

    if (message) {
      return res.status(code).json({ message });
    }

    return res.status(code).json(content);
  }
}