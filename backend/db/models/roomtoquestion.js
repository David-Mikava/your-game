'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoomToQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Room, { foreignKey: 'roomId', onDelete: 'CASCADE' });
      this.belongsTo(models.Question, { foreignKey: 'questionId' });
    }
  }
  RoomToQuestion.init(
    {
      roomId: DataTypes.INTEGER,
      questionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'RoomToQuestion',
    },
  );
  return RoomToQuestion;
};
