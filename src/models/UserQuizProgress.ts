// src/models/UserQuizProgress.ts
import { DataTypes, Model, Optional, Association } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Quiz from './Quiz';

interface UserQuizProgressAttributes {
  id: number;
  user_id: number;
  quiz_id: number;
  score: number;
  completed: boolean;
}

interface UserQuizProgressCreationAttributes extends Optional<UserQuizProgressAttributes, 'id'> {}

class UserQuizProgress extends Model<UserQuizProgressAttributes, UserQuizProgressCreationAttributes>
  implements UserQuizProgressAttributes {
  public id!: number;
  public user_id!: number;
  public quiz_id!: number;
  public score!: number;
  public completed!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly Quiz?: Quiz;

  public static associations: {
    Quiz: Association<UserQuizProgress, Quiz>;
  };
}

UserQuizProgress.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quiz_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'UserQuizProgress',
    tableName: 'user_quiz_progress',
    timestamps: true,
  }
);

UserQuizProgress.belongsTo(User, { foreignKey: 'user_id' });
UserQuizProgress.belongsTo(Quiz, { foreignKey: 'quiz_id', as: 'Quiz' });

export default UserQuizProgress;
