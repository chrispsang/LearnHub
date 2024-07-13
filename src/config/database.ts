// src/config/database.ts

import { Sequelize } from 'sequelize';

// Replace with your actual database credentials
const sequelize = new Sequelize('online_learning_platform', 'christinaps', '', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;
