'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Statistic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Statistic.init(
    {
      userId: DataTypes.INTEGER,
      points: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Statistic',
    },
  );
  return Statistic;
};
