const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../database");

class resumesModel extends Model {}

resumesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    accountUser_id: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    resume_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resume_template_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: "resumes_table",
    timestamps: true, 
  }
);

module.exports = resumesModel;
