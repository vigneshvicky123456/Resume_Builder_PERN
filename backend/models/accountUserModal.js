const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../database");

class accountUserModel extends Model {}

accountUserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clerkUserId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING(1000),
        allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "accountusers_tables",
    timestamps: true,
  }
);

module.exports = accountUserModel;
