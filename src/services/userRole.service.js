import db from "../config/connectionDB";

exports.getRolesByUser = async (userId) => {
  const [row] = await db.execute(
    `SELECT ur.USERROLEID, role.ROLEID, role.ROLENAME, role.DESCRIPTION
     FROM USER_ROLE ur
     JOIN ROLE role ON ur.ROLEID = role.ROLEID
     WHERE ur.USERID = ?`,
    [userId]
  );
  return row;
};

exports.getUsersByRole = async (roleId) => {
  const [row] = await db.execute(
    `SELECT ur.USERROLEID, user.USERID, user.FULLNAME, user.EMAIL
     FROM USER_ROLE ur
     JOIN USER user ON ur.USERID = user.USERID
     WHERE ur.ROLEID = ?`,
    [roleId]
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

exports.checkExist = async (userId, roleId) => {
  const [row] = await db.execute(
    `SELECT * FROM USER_ROLE WHERE USERID = ? AND ROLEID = ?`,
    [userId, roleId]
  );
  return row;
};

exports.assignRole = async (userId, roleId) => {
  const [row] = await db.execute(
    `INSERT INTO USER_ROLE(USERID, ROLEID, CREATEDDATE, UPDATEDDATE)
     VALUES (?, ?, NOW(), NOW())`,
    [userId, roleId]
  );
  return row;
};

exports.removeRole = async (userId, roleId) => {
  const [row] = await db.execute(
    `DELETE FROM USER_ROLE WHERE USERID = ? AND ROLEID = ?`,
    [userId, roleId]
  );
  return row;
};

exports.delete = async (userRoleId) => {
  const [row] = await db.execute(`DELETE FROM USER_ROLE WHERE USERROLEID = ?`, [userRoleId]);
  return row;
};