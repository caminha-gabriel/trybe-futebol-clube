import { Request, Response } from "express";

export default interface IMatchController {
  getAll(req: Request, res: Response): Promise<Response>;

  saveMatch(req: Request, res: Response): Promise<Response>;

  finishMatch(req: Request, res: Response): Promise<Response>;
}
