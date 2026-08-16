import db from "../config/connectionDB";

exports.getAll = async () => {
  const [row] = await db.execute(
    `SELECT
    user.USERID,
    user.EMAIL,
    user.PHONENUMBER,
    user.FULLNAME,
    user.DATEOFBIRTH,
    user.GENDER,
    user.PHOTO,
    donor.DONORID,
    donor.WEIGHT,
    donor.HEIGHT,
    donor.BLOODTYPENAME
    FROM
    USER user JOIN DONOR donor ON user.USERID = donor.USERID`
  );
  return row;
};

exports.getId = async (id) => {
  const [row] = await db.execute(
    `SELECT
    user.USERID,
    user.EMAIL,
    user.PHONENUMBER,
    user.FULLNAME,
    user.DATEOFBIRTH,
    user.GENDER,
    user.CCCD,
    user.PHOTO,
    donor.DONORID,
    donor.WEIGHT,
    donor.HEIGHT,
    donor.BLOODTYPENAME
    FROM
    USER user JOIN DONOR donor ON user.USERID = donor.USERID
    WHERE user.USERID = ?`,
    [id]
  );
  return row;
};

exports.getDonorSalient = async () => {
  const [row] = await db.execute(
    `SELECT
    user.USERID,
    user.EMAIL,
    user.PHONENUMBER,
    user.FULLNAME,
    user.DATEOFBIRTH,
    user.GENDER,
    user.PHOTO,
    donor.DONORID,
    donor.WEIGHT,
    donor.HEIGHT,
    donor.BLOODTYPENAME
    FROM
    USER user JOIN DONOR donor ON user.USERID = donor.USERID
    ORDER BY donor.CREATEDDATE DESC
    LIMIT 2`
  );
  return row;
};

exports.add = async (userId, donorBody) => {
  const [row] = await db.execute(
    `INSERT INTO
      DONOR(USERID, WEIGHT, HEIGHT, BLOODTYPENAME, CREATEDDATE, UPDATEDDATE)
      VALUES (?, ?, ?, ?, NOW(), NOW())`,
    [userId, donorBody.weight, donorBody.height, donorBody.bloodTypeName]
  );
  return row;
};

exports.update = async (id, donorBody) => {
  const [row] = await db.execute(
    `UPDATE DONOR
      SET
        WEIGHT = ?,
        HEIGHT = ?,
        BLOODTYPENAME = ?,
        UPDATEDDATE = NOW()
      WHERE USERID = ?`,
    [donorBody.weight, donorBody.height, donorBody.bloodTypeName, id]
  );
  return row;
};

exports.delete = async (id) => {
  const [row] = await db.execute(`DELETE FROM DONOR WHERE USERID = ?`, [id]);
  return row;
};