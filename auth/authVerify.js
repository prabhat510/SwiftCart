const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("unauthorized request");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).send("unauthorized request");
  } else {
    try {
      jwt.verify(token, process.env.TOKEN_SECRET, (error, userData) => {
        if (error) return res.sendStatus(403);
        req.user = userData;
        next();
      });
    } catch (error) {
      return res.status(401).send("unauthorized request");
    }
  }
}
module.exports = verifyToken;