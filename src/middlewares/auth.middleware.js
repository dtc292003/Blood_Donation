exports.verifySession = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ errcode: 1, message: "Please login first" });
  }
  next();
};

// Cho phép chính chủ truy cập
exports.verifyOwnerOrAdmin = async (req, res, next) => {
  const targetId = req.params.id || req.params.userId;
  const sessionUserId = req.session.userId;

  if (parseInt(targetId) === parseInt(sessionUserId)) {
    return next(); // đúng chủ sở hữu
  };

// Kiểm tra có phải Admin không
  const [roles] = await db.execute(
    `SELECT * FROM USER_ROLE ur JOIN ROLE r ON ur.ROLEID = r.ROLEID
     WHERE ur.USERID = ${sessionUserId} AND r.ROLENAME = 'Admin'`
  );

  if (roles.length > 0) {
    return next();
  }

  return res.status(403).json({ errcode: 1, message: "Forbidden: not your resource" });
};