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

  static async saveMatch(matchData: Match): Promise<IServiceResponse> {
    const { homeTeam: homeTeamId, awayTeam: awayTeamId } = matchData;
  
    const homeTeam = await Team.findByPk(homeTeamId);
    const awayTeam = await Team.findByPk(awayTeamId);

    if (!homeTeam || !awayTeam) return {
      code: Number(StatusCodes.NOT_FOUND),
      message: 'There is no team with such id!'
    }

    const result = await Match.create(matchData);

    if (result) return {
      code: Number(StatusCodes.CREATED),
      content: result
    }

    return {
      code: Number(StatusCodes.INTERNAL_SERVER_ERROR),
      message: 'Something went wrong'
    }
  }

  static async finishMatch(id: number): Promise<IServiceResponse> {
    const foundMatch = await Match.findByPk(id);

    if (!foundMatch) return {
      code: Number(StatusCodes.NOT_FOUND),
      message: 'Match not found'
    }

    foundMatch.update({ inProgress: false });

    return {
      code: Number(StatusCodes.OK),
      message: 'Finished'
    }
  }

  static async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<IServiceResponse> {
    const foundMatch = await Match.findByPk(id);

    if (!foundMatch) return {
      code: Number(StatusCodes.NOT_FOUND),
      message: 'Match not found'
    }

    foundMatch.update({ homeTeamGoals, awayTeamGoals });

    return {
      code: Number(StatusCodes.OK),
      message: 'Match updated'
    }
  }
}