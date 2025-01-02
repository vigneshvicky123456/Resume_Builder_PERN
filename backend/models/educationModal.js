const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../database");

class educationModel extends Model {}

educationModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    resume_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    institution_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    degree_of_program: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    field_of_study: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "education_table",
  }
);

module.exports = educationModel;
