const { Model, DataTypes } = require("sequelize");
const  { sequelize } = require("../database");

class summaryModal extends Model {}

summaryModal.init(
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
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "summary_table",
  }
);

module.exports = summaryModal;