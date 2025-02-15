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
      allowNull: true,
    },
    institution_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    degree_of_program: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cgpa: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    field_of_study: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    start_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    additional_details: {
      type:DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: "education_table",
  }
);

module.exports = educationModel;
