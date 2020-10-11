// @ts-nocheck
import { DataTypes, Sequelize } from 'sequelize';

export const up = async (sequelize: Sequelize) => {
  const user = await sequelize.models.User.describe();
  if (!user.location) {
    await sequelize.getQueryInterface().addColumn('Users', 'location', {
      type: DataTypes.GEOGRAPHY,
    });
  }
};

export const down = async (sequelize: Sequelize) => {
  const user = await sequelize.models.User.describe();
  if (user.location) {
    await sequelize.getQueryInterface().removeColumn('Users', 'location');
  }
};
