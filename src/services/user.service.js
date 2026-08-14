import db from "../config/connectionDB";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

exports.getAll = async () => {
  const [row, fields] = await db.execute(`SELECT * FROM USER`);
  return row;
};

exports.getId = async (id) => {
  const [row, fields] = await db.execute(`SELECT * FROM USER WHERE USERID = ${id}`);
  return row;
};

exports.getEmail = async (userBody) => {
  const [row, fields] = await db.execute(
    `SELECT * FROM USER WHERE EMAIL = '${userBody.email}'`
  );
  return row;
};

exports.add = async (userBody) => {
  const passwordHash = await hashPassword(userBody.password);
  const [row, fields] = await db.execute(
    `INSERT INTO USER(USERNAME, PASSWORD, EMAIL, PHONENUMBER, FULLNAME, DATEOFBIRTH, GENDER, ADDRESS, PHOTO, CREATEDDATE, UPDATEDDATE)
     VALUES ('${userBody.username}', '${passwordHash}', '${userBody.email}', '${userBody.phonenumber}', '${userBody.fullname || ""}', ${userBody.dateofbirth ? `'${userBody.dateofbirth}'` : "NULL"}, '${userBody.gender || ""}', '${userBody.address || ""}', '${userBody.photo || ""}', NOW(), NOW())`
  );
  return row;
};

exports.update = async (id, userBody) => {
  const passwordHash = await hashPassword(userBody.password);
  const [row, fields] = await db.execute(
    `UPDATE USER SET
      PASSWORD = '${passwordHash}',
      EMAIL = '${userBody.email}',
      PHONENUMBER = '${userBody.phonenumber}',
      FULLNAME = '${userBody.fullname || ""}',
      GENDER = '${userBody.gender || ""}',
      ADDRESS = '${userBody.address || ""}',
      UPDATEDDATE = NOW()
      WHERE USERID = ${id}`
  );
  return row;
};

exports.delete = async (id) => {
  const [row, fields] = await db.execute(`DELETE FROM USER WHERE USERID = ${id}`);
  return row;
};

let hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    try {
      let hashPassword = bcrypt.hashSync(password, salt);
      // console.log('>>> hashPassword', hashPassword);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};