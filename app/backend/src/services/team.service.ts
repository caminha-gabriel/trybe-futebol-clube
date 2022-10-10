import { StatusCodes } from 'http-status-codes';
import Team from '../database/models/team.model';
import IServiceResponse from '../interfaces/IServiceResponse';

export default class TeamService {
  static async getAll(): Promise<IServiceResponse> {
    const result = await Team.findAll();

    if (result) return {
      code: Number(StatusCodes.OK),
      content: result
    }

    return {
      code: Number(StatusCodes.NOT_FOUND),
      message: 'Content not found'
    }
  }

  static async findById(id: number): Promise<IServiceResponse> {
    const result = await Team.findByPk(id);

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