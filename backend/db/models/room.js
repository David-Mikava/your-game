'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
      this.belongsToMany(models.Question, { through: 'RoomToQuestion', foreignKey: 'roomId' });
      
    }
  }
  Room.init(
    {
      userId: DataTypes.INTEGER,
      answers: DataTypes.JSONB,
      status: DataTypes.STRING,
      total: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Room',
    },
  );
  return Room;
};
