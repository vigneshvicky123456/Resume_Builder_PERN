const accountUserModel = require("./accountUserModal");
const resumesModel = require("./resumesModal");
const contactModel = require("./contactModal");
const experienceModel = require("./experienceModal");
const educationModel = require("./educationModal");
const certificateModal = require("./certificateModal");
const skillModel = require("./skillModal");
const summaryModel = require("./summaryModal");
const referenceModel = require("./referenceModal");

// Define associations

//accountUserModel
accountUserModel.hasMany(resumesModel, {
  foreignKey: "accountUser_id",
  sourceKey: "clerkUserId",
  as: "resumesModel",
  onDelete: 'CASCADE'
});

resumesModel.belongsTo(accountUserModel, {
  foreignKey: "accountUser_id",
  targetKey: "clerkUserId",
  as: "accountUserModel",
});

//contactModel
resumesModel.hasMany(contactModel, {
  foreignKey: "resume_id",
  sourceKey: "id",
  as: "contactModel", 
  onDelete: 'CASCADE'
});

contactModel.belongsTo(resumesModel, {
  foreignKey: "resume_id",
  targetKey: "id",
  as: "resumesModel",
});

// experienceModel
resumesModel.hasMany(experienceModel, {
  foreignKey: "resume_id",
  sourceKey: "id",
  as: "experienceModel",
  onDelete: 'CASCADE'
});

experienceModel.belongsTo(resumesModel, {
  foreignKey: "resume_id",
  targetKey: "id",
  as: "resumesModel",
});

//educationModel
resumesModel.hasMany(educationModel, {
  foreignKey: "resume_id",
  sourceKey: "id",
  as: "educationModel",
  onDelete: 'CASCADE'
});

educationModel.belongsTo(resumesModel, {
  foreignKey: "resume_id",
  targetKey: "id",
  as: "resumesModel",
});

//certificateModal
resumesModel.hasMany(certificateModal, {
  foreignKey: "resume_id",
  sourceKey: "id",
  as: "certificateModal",
  onDelete: 'CASCADE'
});

certificateModal.belongsTo(resumesModel, {
  foreignKey: "resume_id",
  targetKey: "id",
  as: "resumesModel",
});

//skillModel
resumesModel.hasMany(skillModel, {
  foreignKey: "resume_id",
  sourceKey: "id",
  as: "skillModel",
  onDelete: 'CASCADE'
});

skillModel.belongsTo(resumesModel, {
  foreignKey: "resume_id",
  targetKey: "id",
  as: "resumesModel",
});

//summaryModel
resumesModel.hasMany(summaryModel, {
  foreignKey: "resume_id",
  sourceKey: "id",
  as: "summaryModel",
  onDelete: 'CASCADE'
});

summaryModel.belongsTo(resumesModel, {
  foreignKey: "resume_id",
  targetKey: "id",
  as: "resumesModel",
});

//referenceModel
resumesModel.hasMany(referenceModel, {
  foreignKey: "resume_id",
  sourceKey: "id",
  as: "referenceModel",
  onDelete: 'CASCADE'
});

referenceModel.belongsTo(resumesModel, {
  foreignKey: "resume_id",
  targetKey: "id",
  as: "resumesModel",
});

module.exports = { accountUserModel, resumesModel, contactModel, experienceModel, educationModel, certificateModal, skillModel, summaryModel, referenceModel };
