// src/models/Leaderboard.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Course from './Course';

interface LeaderboardAttributes {
  id: number;
  userId: number;
  courseId: number;
  score: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface LeaderboardCreationAttributes extends Optional<LeaderboardAttributes, 'id'> {}

class Leaderboard extends Model<LeaderboardAttributes, LeaderboardCreationAttributes> implements LeaderboardAttributes {
  public id!: number;
  public userId!: number;
  public courseId!: number;
  public score!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Leaderboard.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', 
        key: 'id',
      },
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'courseId', 
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at', 
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'updated_at', 
    },
  },
  {
    sequelize,
    modelName: 'Leaderboard',
    tableName: 'leaderboard', 
  }
);

// Define associations
Leaderboard.belongsTo(User, { foreignKey: 'userId', as: 'User' });
Leaderboard.belongsTo(Course, { as: 'Course', foreignKey: 'courseId' });

export default Leaderboard;
