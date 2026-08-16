import db from "../config/connectionDB";

exports.verifySession = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ errcode: 1, message: "Please login first" });
  }
  next();
};

const isAdmin = async (sessionUserId) => {
  const [roles] = await db.execute(
    `SELECT * FROM USER_ROLE ur JOIN ROLE r ON ur.ROLEID = r.ROLEID
     WHERE ur.USERID = ? AND r.ROLENAME = ?`,
    [sessionUserId, "Admin"]
  );
  return roles.length > 0;
};

exports.verifyOwnerOrAdmin = async (req, res, next) => {
  try {
    const targetId = req.params.id || req.params.userId;
    const sessionUserId = req.session.userId;

    if (parseInt(targetId) === parseInt(sessionUserId)) {
      return next(); // đúng chủ sở hữu
    }

    if (await isAdmin(sessionUserId)) {
      return next();
    }

    return res.status(403).json({ errcode: 1, message: "Forbidden: not your resource" });
  } catch (err) {

    next(err);
  }
};

exports.verifyResourceOwnerOrAdmin = (fetchResourceFn, ownerFieldNames = ["userId", "USERID", "user_id"]) => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params.id;
      const sessionUserId = req.session.userId;

      if (!resourceId) {
        return res.status(400).json({ errcode: 1, message: "Id is required" });
      }

      const raw = await fetchResourceFn(resourceId);
      const resource = Array.isArray(raw) ? raw[0] : raw;

      if (!resource) {
        return res.status(404).json({ errcode: 1, message: "Not found" });
      }

      const ownerField = ownerFieldNames.find((f) => resource[f] !== undefined);
      const ownerUserId = ownerField ? resource[ownerField] : undefined;

      if (ownerUserId !== undefined && parseInt(ownerUserId) === parseInt(sessionUserId)) {
        return next(); // đúng chủ sở hữu
      }

      if (await isAdmin(sessionUserId)) {
        return next();
      }

      return res.status(403).json({ errcode: 1, message: "Forbidden: not your resource" });
    } catch (err) {
      next(err);
    }
  };
};

exports.verifyOwnerViaQuery = (sql, paramName = "id") => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params[paramName];
      const sessionUserId = req.session.userId;

      if (!resourceId) {
        return res.status(400).json({ errcode: 1, message: `${paramName} is required` });
      }

      const [rows] = await db.execute(sql, [resourceId]);

      if (rows.length === 0) {
        return res.status(404).json({ errcode: 1, message: "Not found" });
      }

      const ownerUserId = rows[0].USERID ?? rows[0].userId ?? rows[0].user_id;

      if (ownerUserId !== undefined && parseInt(ownerUserId) === parseInt(sessionUserId)) {
        return next();
      }

      if (await isAdmin(sessionUserId)) {
        return next();
      }

      return res.status(403).json({ errcode: 1, message: "Forbidden: not your resource" });
    } catch (err) {
      next(err);
    }
  };
};

exports.requireAdmin = async (req, res, next) => {
  try {
    const sessionUserId = req.session.userId;

    if (await isAdmin(sessionUserId)) {
      return next();
    }

    return res.status(403).json({ errcode: 1, message: "Forbidden: admin only" });
  } catch (err) {
    next(err);
  }
};