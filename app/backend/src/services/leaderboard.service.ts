import { StatusCodes } from 'http-status-codes';
import Match from '../database/models/match.model';
import Team from '../database/models/team.model';
import IServiceResponse from '../interfaces/IServiceResponse';
import ITeamClassification from'../interfaces/ITeamClassification';
import decreasingSortTeams from '../utils/decreasingSortTeams.utils';

export default class TeamService {
  static async getAll(): Promise<IServiceResponse> {
    const finishedMatches = await Match.findAll({ where: { inProgress: false }});
    const teams = await Team.findAll();
    const homeTeams: any[] = [];

    finishedMatches.forEach((match) => homeTeams.push(match.homeTeam));
    const filteredHomeTeams = homeTeams.filter((value, index) => homeTeams.indexOf(value) === index);

    const finalTeamsClassifications = filteredHomeTeams.map((teamId) => {
      const foundTeam = teams.find((team) => team.id === teamId);
      const teamMatches = finishedMatches.filter((match) => match.homeTeam === teamId);

      let name: string | undefined;
      let totalPoints: number = 0;
      let totalGames: number = 0;
      let totalVictories: number = 0;
      let totalDraws: number = 0;
      let totalLosses: number = 0;
      let goalsFavor: number = 0;
      let goalsOwn: number = 0;
      let goalsBalance: number = 0;
      let efficiency: string = '';
  
      if (!foundTeam) throw new Error('Something went wrong');

      name = foundTeam.teamName;
      totalGames = teamMatches.length;
      teamMatches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
        goalsFavor += homeTeamGoals;
        goalsOwn += awayTeamGoals;
        goalsBalance = goalsFavor - goalsOwn;
        
        if (homeTeamGoals > awayTeamGoals) {
          totalVictories += 1;
          totalPoints += 3;
        };

        if (homeTeamGoals === awayTeamGoals) {
          totalDraws += 1;
          totalPoints += 1;
        };
        
        if (homeTeamGoals < awayTeamGoals) {
          totalLosses += 1;
          totalPoints -= 0;
        };

        const efficiencyValue = totalPoints / (totalGames * 3) * 100;
        efficiency = `${(Math.round(efficiencyValue * 100) / 100).toFixed(2)}`;
      });

      const teamClassification: ITeamClassification  = {
        name,
        totalPoints,
        totalGames,
        totalVictories,
        totalDraws,
        totalLosses,
        goalsFavor,
        goalsOwn,
        goalsBalance,
        efficiency,
      }
      
      return teamClassification;
    });
    
    return {
      code: Number(StatusCodes.OK),
      content: finalTeamsClassifications.sort(decreasingSortTeams)
    }
  };
};
