const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get token from the header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    jwt.verify(token, config.get("jwtSecret"), (err, decoded) => {
      if (err) {
        return res.status(401).json({ msg: "Token is not valid" });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error("Something wrong with auth middleware");
    res.status(500).json({ msg: "Server Error" });
  }
};

// module.exports = isAuthenticated;
