const jwt = require("jsonwebtoken");

// Middleware qui permet de décoder et d'utiliser le token de l'utilisateur connecté et de vérifié le status admin
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    const userId = decodedToken.userId;
    const isAdmin = !!decodedToken.isAdmin;
    req.auth = { userId, isAdmin };
    // if (req.body.userId && req.body.userId != userId) {
    //   return res.status(403).json("Forbidden");
    // } else {
    // }
    next();
  } catch (e) {
    console.log(e);
    res.status(401).json({ error: "Unauthorized!" });
  }
};
