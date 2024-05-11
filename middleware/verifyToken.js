const JWT = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    console.log("pinu");
    const token = req.headers.authorization;
    if (!token) {
      res.status().send({ errorMessage: "Unauthorized access" });
    }
    const decode = JWT.verify(token, process.env.SECRET_KEY);
    req.userId = decode.userId;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ isUnauthorized:true,errorMessage: "Unauthorized access! Invalid token" });
  }
};

module.exports = {
  verifyToken,
};
