const { mainFormController } = require("../../controllers/index");

function sendAnswer(success, data, res, statusCode = 200) {
  if (success) {
    const { contentType, content } = data;
    res.writeHead(200, contentType);
    res.write(content);
    res.end();
  } else {
    const { error } = data;
    console.log(error);
    res.writeHead(401);
    res.write("Undefined");
    res.end();
  }
}

exports.getRes = async (req, res) => {
  const { fullPath, method, body } = req;
  if (fullPath.endsWith("/") && method === "get") {
    try {
      const { success, data } = await mainFormController.getFormPage(req, res);
      sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  }
};
