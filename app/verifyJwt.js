const jwt = require("jsonwebtoken");

const verifyJwt = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch {
    return undefined;
  }
};
module.exports = verifyJwt;
