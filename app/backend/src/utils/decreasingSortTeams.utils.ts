import ITeamClassification from "../interfaces/ITeamClassification";

export default function decreasingSortTeams(a: ITeamClassification, b: ITeamClassification) {
  switch (true) {
    // sort by total points
    case a.totalPoints < b.totalPoints:
      return 1;
    case a.totalPoints > b.totalPoints:
      return -1;
    // sort by total victories
    case a.totalVictories < b.totalVictories:
      return 1;
    case a.totalVictories > b.totalVictories:
      return -1;
    // sort by goals balance
    case a.goalsBalance < b.goalsBalance:
      return 1;
    case a.goalsBalance > b.goalsBalance:
      return -1;
    // sort by goals favor
    case a.goalsFavor < b.goalsFavor:
      return 1;
    case a.goalsFavor > b.goalsFavor:
      return -1;
    // sort by goals own with inverted logic
    case a.goalsOwn < b.goalsOwn:
      return -1;
    case a.goalsOwn > b.goalsOwn:
      return 1;
    default:
      return 0;
  }
}