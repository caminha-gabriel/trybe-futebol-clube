import { Request, Response } from "express";

export default interface ITeamController {
  getAll(req: Request, res: Response): Promise<Response>;

  findById(req: Request, res: Response): Promise<Response>;
}