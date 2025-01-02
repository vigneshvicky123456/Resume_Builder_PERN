const accountUserModel = require("./accountUserModal");
const resumesModel = require("./resumesModal");
const contactModel = require("./contactModal");
const educationModel = require("./educationModal");

// Define associations
accountUserModel.hasMany(resumesModel, {
  foreignKey: "accountUser_id",
  sourceKey: "clerkUserId",
  as: "resumes",
});

resumesModel.belongsTo(accountUserModel, {
  foreignKey: "accountUser_id",
  targetKey: "clerkUserId",
  as: "accountUser",
});

resumesModel.hasMany(contactModel, {
  foreignKey: "resume_id",
  sourceKey: "id",
  as: "contacts",
});

contactModel.belongsTo(resumesModel, {
  foreignKey: "resume_id",
  targetKey: "id",
  as: "resume",
});

resumesModel.hasMany(educationModel, {
  foreignKey: "resume_id",
  sourceKey: "id",
  as: "education",
});

educationModel.belongsTo(resumesModel, {
  foreignKey: "resume_id",
  targetKey: "id",
  as: "resume",
});

module.exports = { accountUserModel, resumesModel, contactModel, educationModel };
