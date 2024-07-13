// src/models/Course.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { CourseAttributes } from './types';
import Review from './Review'; 

class Course extends Model<CourseAttributes, Optional<CourseAttributes, 'id'>> implements CourseAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public keyPoints!: string[];
  public courseStructure!: string[];
  public targetAudience!: string[];
  public prerequisites!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  
  public quizzes?: any[];

  public reviews?: Review[];
}

Course.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    keyPoints: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    courseStructure: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    targetAudience: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    prerequisites: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Course',
    tableName: 'courses',
    timestamps: true,
  }
);

// Define the association with the Review model
Course.hasMany(Review, { foreignKey: 'courseId', as: 'reviews' });
Review.belongsTo(Course, { foreignKey: 'courseId' });

export default Course;
