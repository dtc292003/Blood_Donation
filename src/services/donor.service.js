import db from "../config/connectionDB";

exports.getAll = async () => {
  const [row, fields] = await db.execute(
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
  const [row, fields] = await db.execute(
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
    WHERE user.USERID = ${id}`
  );
  return row;
};

exports.getDonorSalient = async () => {
  const [row, fields] = await db.execute(
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
  const [row, fields] = await db.execute(
    `INSERT INTO
      DONOR(USERID, WEIGHT, HEIGHT, BLOODTYPENAME, CREATEDDATE, UPDATEDDATE)
      VALUES (${userId}, ${donorBody.weight}, ${donorBody.height}, '${donorBody.bloodTypeName}', NOW(), NOW())`
  );
  return row;
};

exports.update = async (id, donorBody) => {
  const [row, fields] = await db.execute(
    `UPDATE DONOR
      SET
        WEIGHT = ${donorBody.weight},
        HEIGHT = ${donorBody.height},
        BLOODTYPENAME = '${donorBody.bloodTypeName}',
        UPDATEDDATE = NOW()
      WHERE USERID = ${id}`
  );
  return row;
};

exports.delete = async (id) => {
  const [row, fields] = await db.execute(`DELETE FROM DONOR WHERE USERID = ${id}`);
  return row;
};