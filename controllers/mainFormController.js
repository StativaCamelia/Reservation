const { mainFormPage } = require("../views/index");

class MainFormController {
  async getFormPage(req, res) {
    try {
      const { content, contentType } = await mainFormPage.getPage();
      return { success: true, data: { content, contentType } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }
}

module.exports = MainFormController;
