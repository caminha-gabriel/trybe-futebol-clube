import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

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

export default Team;
