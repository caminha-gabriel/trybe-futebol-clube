import { StatusCodes } from 'http-status-codes';
import Match from '../database/models/match.model';
import Team from '../database/models/team.model';
import IServiceResponse from '../interfaces/IServiceResponse';

const queryIncludeTeamArr = [
  {
    model: Team,
    as: 'teamHome',
    attributes: ['teamName']
  },
  {
    model: Team,
    as: 'teamAway',
    attributes: ['teamName']
  }
];

export default class MatchService {
  static async getAll(inProgressFilter?: string): Promise<IServiceResponse> {
    const inProgress = inProgressFilter === 'true' ? true : inProgressFilter === 'false' ? false : undefined;
    let result;
    
    if (typeof (inProgress) === 'boolean') {
      result = await Match.findAll({ where: { inProgress }, include: queryIncludeTeamArr });
    } else {
      result = await Match.findAll({ include: queryIncludeTeamArr });
    }

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