// src/models/Reply.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Forum from './Forum';

class Reply extends Model {
    public id!: number;
    public content!: string;
    public userId!: number;
    public forumId!: number;
    public username!: string;
    public parentId!: number | null; // Add parentId field
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate(models: any) {
        Reply.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        Reply.belongsTo(models.Forum, { foreignKey: 'forumId', as: 'forum' });
        Reply.belongsTo(Reply, { foreignKey: 'parentId', as: 'parentReply' }); // Correct association for parent reply
    }
}


Reply.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        content: {
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
        forumId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Forum,
                key: 'id',
            },
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        parentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'replies', // Self-referential foreign key
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
        modelName: 'Reply',
        tableName: 'replies',
        timestamps: true,
    }
);

// Call the associate method after all models are defined
Reply.associate({ User, Forum });

export default Reply;
