const url = require("url");
const { mainFormRoute } = require("./routes/index");
const { staticFilesController } = require("../controllers/index");

exports.getRes = async (req, res) => {
  const parsedReq = {};
  parsedReq.parsedUrl = url.parse(req.url, true);
  parsedReq.path = parsedReq.parsedUrl.pathname;
  parsedReq.trimmedPath = parsedReq.path.replace(/^\/+|\/+$/g, "");
  parsedReq.fullPath =
    parsedReq.trimmedPath.substring(0, parsedReq.path.indexOf("/")) + "/";
  parsedReq.method = req.method.toLowerCase();
  parsedReq.headers = req.headers;
  parsedReq.user = req.user;
  parsedReq.queryStringObject = JSON.parse(
    JSON.stringify(parsedReq.parsedUrl.query)
  );
  let body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });
  req.on("end", () => {
    body = Buffer.concat(body).toString();
    if (body) parsedReq.body = JSON.parse(body);
    if (
      parsedReq.path.includes(".png") ||
      parsedReq.path.includes(".css") ||
      parsedReq.path.includes(".svg") ||
      parsedReq.path.includes(".js") ||
      parsedReq.path.includes(".jpg")
    ) {
      try {
        staticFilesController.getRes(parsedReq, res);
        return;
      } catch (error) {
        return;
      }
    }

    if (parsedReq.path.indexOf("reservation") !== -1) {
      mainFormRoute.getRes(parsedReq, res);
      return;
    }
  });
};
