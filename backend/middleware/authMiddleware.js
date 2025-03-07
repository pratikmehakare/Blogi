const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ 
    error: "No token provided" 
  });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ 
      error: "Token expired or invalid"
     });
    req.userId = decoded.id;
    next();
  });
};

module.exports = authMiddleware;
