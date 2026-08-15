exports.verifySession = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ errcode: 1, message: "Please login first" });
  }
  next();
};