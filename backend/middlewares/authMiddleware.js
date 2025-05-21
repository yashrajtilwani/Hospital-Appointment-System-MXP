import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
  const token = req.cookies.token; // assuming token is stored in cookie as "token"

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // save user info to request
    next();
  } catch (err) {
    return res.status(400).json({success: false,  message: 'Invalid token.' });
  }
}

export {verifyToken};
