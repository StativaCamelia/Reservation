const MainFormController = require("./mainFormController.js");
const StaticFilesController = require("./staticFilesController");

const staticFilesController = new StaticFilesController();
const mainFormController = new MainFormController();

module.exports = {
  staticFilesController,
  mainFormController,
};
