const { Model, DataTypes } = require("sequelize");
const  { sequelize } = require("../database");

class certificateModal extends Model {}

certificateModal.init(
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
    certificte_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "certificate_table",
  }
);

module.exports = certificateModal;
