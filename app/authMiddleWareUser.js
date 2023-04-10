const verifyJwt = require("./verifyJwt");

const authMiddleWareUser = (req, res, next) => {
  const authToken = req.headers.auth;
  //console.log(authToken);
  if (!authToken) {
    console.log("you are not authorized to use this webpage");
    res.status(500).send([{}]);
    return;
  }
  const decoded = verifyJwt(authToken);
  if (!decoded) {
    console.log("your token has expired");
    res.status(500).send([{}]);
    return;
  }
  if (decoded.type != "user") {
    console.log("you are not authorized to view this page");
    res.status(500).send([{}]);
    return;
  }
  req.auth = {
    id: decoded.user,
    type: decoded.type,
  };
  //res.status(200).send();
  next();
};

module.exports = authMiddleWareUser;
