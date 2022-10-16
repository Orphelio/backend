const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.PRIVATE_JWT);
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    console.log(req.auth);
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
