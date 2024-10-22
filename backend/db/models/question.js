'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Theme, {
        foreignKey: 'themeId',
      });
      this.belongsToMany(models.Room, { through: 'RoomToQuestion', foreignKey: 'questionId' });
    }
  }
  Question.init(
    {
      name: DataTypes.STRING,
      points: DataTypes.INTEGER,
      themeId: DataTypes.INTEGER,
      answer: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Question',
    },
  );
  return Question;
};
