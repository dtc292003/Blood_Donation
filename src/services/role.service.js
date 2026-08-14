import db from "../config/connectionDB";

exports.getAll = async () => {
  const [row] = await db.execute(`SELECT * FROM ROLE`);
  return row;
};

exports.getId = async (id) => {
  const [row] = await db.execute(`SELECT * FROM ROLE WHERE ROLEID = ${id}`);
  return row;
};

exports.add = async (roleBody) => {
  const [row] = await db.execute(
    `INSERT INTO ROLE(ROLENAME, DESCRIPTION, CREATEDDATE, UPDATEDDATE)
     VALUES ('${roleBody.roleName}', '${roleBody.description || ""}', NOW(), NOW())`
  );
  return row;
};

exports.update = async (id, roleBody) => {
  const [row] = await db.execute(
    `UPDATE ROLE SET ROLENAME = '${roleBody.roleName}', DESCRIPTION = '${roleBody.description || ""}', UPDATEDDATE = NOW()
     WHERE ROLEID = ${id}`
  );
  return row;
};

exports.delete = async (id) => {
  const [row] = await db.execute(`DELETE FROM ROLE WHERE ROLEID = ${id}`);
  return row;
};