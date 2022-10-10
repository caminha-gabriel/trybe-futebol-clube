import { StatusCodes } from 'http-status-codes';
import Team from '../database/models/team.model';
import IServiceResponse from '../interfaces/IServiceResponse';

export default class TeamService {
  static async getAll(): Promise<IServiceResponse> {
    const result = await Team.findAll();
    console.log(result);

    if (result) return {
      code: Number(StatusCodes.OK),
      content: result
    }

    return {
      code: Number(StatusCodes.NOT_FOUND),
      message: 'Content not found'
    }
  }
}