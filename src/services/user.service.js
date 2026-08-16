import db from "../config/connectionDB";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

exports.getAll = async () => {
  const [row] = await db.execute(
    `SELECT USERID, USERNAME, EMAIL, FULLNAME, DATEOFBIRTH, GENDER, PHONENUMBER, ADDRESS, PHOTO, CREATEDDATE, UPDATEDDATE FROM USER`
  );
  return row;
};

exports.getId = async (id) => {
  const [row] = await db.execute(
    `SELECT USERID, USERNAME, EMAIL, FULLNAME, DATEOFBIRTH, GENDER, PHONENUMBER, ADDRESS, PHOTO, CCCD, CREATEDDATE, UPDATEDDATE FROM USER WHERE USERID = ?`,
    [id]
  );
  return row;
};

exports.getEmail = async (userBody) => {
  const [row] = await db.execute(`SELECT * FROM USER WHERE EMAIL = ?`, [userBody.email]);
  return row;
};

exports.add = async (userBody) => {
  const passwordHash = await hashPassword(userBody.password);
  const [row] = await db.execute(
    `INSERT INTO USER(USERNAME, PASSWORD, EMAIL, PHONENUMBER, FULLNAME, DATEOFBIRTH, GENDER, ADDRESS, PHOTO, CREATEDDATE, UPDATEDDATE)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [
      userBody.username,
      passwordHash,
      userBody.email,
      userBody.phonenumber,
      userBody.fullname || "",
      userBody.dateofbirth || null,
      userBody.gender || "",
      userBody.address || "",
      userBody.photo || "",
    ]
  );
  return row;
};

exports.update = async (id, userBody) => {
  const [row] = await db.execute(
    `UPDATE USER SET
      EMAIL = ?,
      PHONENUMBER = ?,
      FULLNAME = ?,
      GENDER = ?,
      ADDRESS = ?,
      UPDATEDDATE = NOW()
      WHERE USERID = ?`,
    [
      userBody.email,
      userBody.phonenumber,
      userBody.fullname || "",
      userBody.gender || "",
      userBody.address || "",
      id,
    ]
  );
  return row;
};

exports.delete = async (id) => {
  const [row] = await db.execute(`DELETE FROM USER WHERE USERID = ?`, [id]);
  return row;
};

let hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    try {
      let hashPassword = bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};