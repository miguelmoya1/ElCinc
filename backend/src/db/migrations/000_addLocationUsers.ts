import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export const up = async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
  await queryInterface.addColumn('Users', 'location', {
    type: DataTypes.GEOGRAPHY,
  });
};

export const down = async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
  await queryInterface.removeColumn('Users', 'location');
};
