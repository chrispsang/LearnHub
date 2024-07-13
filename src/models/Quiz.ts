// src/models/Quiz.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { QuizAttributes } from './types'; // Import types

interface QuizCreationAttributes extends Optional<QuizAttributes, 'id'> {}

class Quiz extends Model<QuizAttributes, QuizCreationAttributes> implements QuizAttributes {
  public id!: number;
  public course_id!: number;
  public question!: string;
  public options!: string[];
  public answer!: string;
  public sequence!: number; 
  public total_questions!: number; 

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public course?: any;
}

Quiz.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'courses', 
        key: 'id',
      },
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    options: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    sequence: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_questions: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Quiz',
    tableName: 'quizzes',
    timestamps: true,
  }
);


export default Quiz;
