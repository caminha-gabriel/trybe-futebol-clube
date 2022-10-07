import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Match from './match.model';

class Team extends Model {
  public id?: number;
  public username!: string;
  public role!: string;
  public email!: string;
  public password!: string;
}

Team.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Team',
  timestamps: false,
});

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeTeam' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayTeam' });

export default Team;
