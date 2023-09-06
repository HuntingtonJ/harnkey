"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Nodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Nodes.init(
    {
      label: DataTypes.STRING,
      color: {
        type: DataTypes.STRING,
        defaultValue: "black",
      },
      type: {
        type: DataTypes.STRING,
        defaultValue: "default",
      },
    },
    {
      sequelize,
      modelName: "Nodes",
    }
  );
  return Nodes;
};
