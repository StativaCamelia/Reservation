const staticFile = require("../staticFileLoader/index");
var zlib = require("zlib");

class StaticFilesController {
  constructor() {}

  async getRes(req, res) {
    try {
      const { success, data } = await staticFile.getStaticResource(req);
      const { content, contentType } = data;
      res.writeHead(200, contentType);
      res.write(content);
      res.end();
    } catch (erorr) {
      console.log(erorr);
    }
  }
}

module.exports = StaticFilesController;
