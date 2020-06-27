const path = require("path");
const staticFileLoader = require("../staticFileLoader/index");
const mainFormLocation = path.join(__dirname, "pages", "./mainForm.html");
const fs = require("mz/fs");

class MainFormPage {
  constructor() {}

  async getPage() {
    try {
      const content = await this.getFileContent();
      const contentType = staticFileLoader.getContentType(mainFormLocation);
      return { content, contentType };
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getFileContent() {
    try {
      const data = await fs.readFile(mainFormLocation);
      return data;
    } catch (error) {
      return error;
    }
  }
}

module.exports = MainFormPage;
