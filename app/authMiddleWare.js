const verifyJwt = require("./verifyJwt");

const authMiddleWare = (req, res, next) => {
  const authToken = req.header("auth");
  if (!authToken) {
    console.log("you are not authorized to use this webpage");
    res.status(400).send();
  }
  const decoded = verifyJwt(authToken);
  if (!decoded) {
    console.log("your token has expired");
    res.status(400).send();
  }
  req.auth = {
    id: decoded.user,
    type: decoded.type,
  };
  res.status(200).send();
};

module.exports = authMiddleWare;
