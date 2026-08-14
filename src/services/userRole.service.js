import db from "../config/connectionDB";

// Xem tất cả role hiện có của 1 user
exports.getRolesByUser = async (userId) => {
  const [row] = await db.execute(
    `SELECT ur.USERROLEID, role.ROLEID, role.ROLENAME, role.DESCRIPTION
     FROM USER_ROLE ur
     JOIN ROLE role ON ur.ROLEID = role.ROLEID
     WHERE ur.USERID = ${userId}`
  );
  return row;
};

// Xem tất cả user đang có 1 role cụ thể
exports.getUsersByRole = async (roleId) => {
  const [row] = await db.execute(
    `SELECT ur.USERROLEID, user.USERID, user.FULLNAME, user.EMAIL
     FROM USER_ROLE ur
     JOIN USER user ON ur.USERID = user.USERID
     WHERE ur.ROLEID = ${roleId}`
  );
  return row;
};

exports.getAll = async () => {
  const [row] = await db.execute(
    `SELECT ur.USERROLEID, user.USERID, user.FULLNAME, role.ROLEID, role.ROLENAME
     FROM USER_ROLE ur
     JOIN USER user ON ur.USERID = user.USERID
     JOIN ROLE role ON ur.ROLEID = role.ROLEID`
  );
  return row;
};

// Kiểm tra user đã có role này chưa (tránh gán trùng)
exports.checkExist = async (userId, roleId) => {
  const [row] = await db.execute(
    `SELECT * FROM USER_ROLE WHERE USERID = ${userId} AND ROLEID = ${roleId}`
  );
  return row;
};

// Gán role cho user — giống "cấp quyền"
exports.assignRole = async (userId, roleId) => {
  const [row] = await db.execute(
    `INSERT INTO USER_ROLE(USERID, ROLEID, CREATEDDATE, UPDATEDDATE)
     VALUES (${userId}, ${roleId}, NOW(), NOW())`
  );
  return row;
};

// Gỡ role khỏi user
exports.removeRole = async (userId, roleId) => {
  const [row] = await db.execute(
    `DELETE FROM USER_ROLE WHERE USERID = ${userId} AND ROLEID = ${roleId}`
  );
  return row;
};

exports.delete = async (userRoleId) => {
  const [row] = await db.execute(`DELETE FROM USER_ROLE WHERE USERROLEID = ${userRoleId}`);
  return row;
};