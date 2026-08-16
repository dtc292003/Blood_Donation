import db from "../config/connectionDB";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

exports.findByEmail = async (email) => {
  const [row] = await db.execute(`SELECT * FROM USER WHERE EMAIL = ?`, [email]);
  return row;
};

exports.findByUsername = async (username) => {
  const [row] = await db.execute(`SELECT * FROM USER WHERE USERNAME = ?`, [username]);
  return row;
};

exports.findByCccd = async (cccd) => {
  const [row] = await db.execute(`SELECT * FROM USER WHERE CCCD = ?`, [cccd]);
  return row;
};

exports.register = async (userBody) => {
  const passwordHash = await hashPassword(userBody.password);
  const [row] = await db.execute(
    `INSERT INTO USER(USERNAME, PASSWORD, EMAIL, PHONENUMBER, FULLNAME, DATEOFBIRTH, GENDER, CCCD, ADDRESS, PHOTO, CREATEDDATE, UPDATEDDATE)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [
      userBody.username,
      passwordHash,
      userBody.email,
      userBody.phonenumber,
      userBody.fullname || "",
      userBody.dateofbirth || null,
      userBody.gender || "",
      userBody.cccd,
      userBody.address || "",
      "",
    ]
  );
  return row;
};

exports.findRoleByName = async (roleName) => {
  const [row] = await db.execute(`SELECT * FROM ROLE WHERE ROLENAME = ?`, [roleName]);
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

exports.comparePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

exports.updatePassword = async (userId, newPassword) => {
  const passwordHash = await hashPassword(newPassword);
  const [row] = await db.execute(
    `UPDATE USER SET PASSWORD = ?, UPDATEDDATE = NOW() WHERE USERID = ?`,
    [passwordHash, userId]
  );
  return row;
};

exports.getUserById = async (id) => {
  const [row] = await db.execute(`SELECT * FROM USER WHERE USERID = ?`, [id]);
  return row;
};

let hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(bcrypt.hashSync(password, salt));
    } catch (e) {
      reject(e);
    }
  });
};