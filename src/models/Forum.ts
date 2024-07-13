// src/models/Forum.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Course from './Course';

// src/models/Forum.ts
class Forum extends Model {
    public id!: number;
    public subject!: string; 
    public message!: string; 
    public userId!: number;
    public username!: string;
    public courseId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate(models: any) {
        Forum.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        Forum.belongsTo(models.Course, { foreignKey: 'courseId', as: 'course' });
    }
}

Forum.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Course,
                key: 'id',
            },
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'Forum',
        tableName: 'forums',
        timestamps: true,
    }
);

export default Forum;
