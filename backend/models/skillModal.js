const { Model, DataTypes } = require("sequelize");
const  { sequelize } = require("../database");

class skillModal extends Model {}

skillModal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    resume_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    skill_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "skill_table",
  }
);

module.exports = skillModal;
