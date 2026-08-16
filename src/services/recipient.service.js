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
    recipient.RECIPENTID,
    recipient.REASON,
    recipient.BLOODTYPENAME
    FROM
    USER user JOIN RECIPIENT recipient ON user.USERID = recipient.USERID`
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
    recipient.RECIPENTID,
    recipient.REASON,
    recipient.BLOODTYPENAME
    FROM
    USER user JOIN RECIPIENT recipient ON user.USERID = recipient.USERID
    WHERE user.USERID = ?`,
    [id]
  );
  return row;
};

exports.add = async (userId, recipientBody) => {
  const [row] = await db.execute(
    `INSERT INTO
      RECIPIENT(USERID, REASON, BLOODTYPENAME, CREATEDDATE, UPDATEDDATE)
      VALUES (?, ?, ?, NOW(), NOW())`,
    [userId, recipientBody.reason, recipientBody.bloodTypeName]
  );
  return row;
};

exports.update = async (id, recipientBody) => {
  const [row] = await db.execute(
    `UPDATE RECIPIENT
      SET
        REASON = ?,
        BLOODTYPENAME = ?,
        UPDATEDDATE = NOW()
      WHERE USERID = ?`,
    [recipientBody.reason, recipientBody.bloodTypeName, id]
  );
  return row;
};

exports.delete = async (id) => {
  const [row] = await db.execute(`DELETE FROM RECIPIENT WHERE USERID = ?`, [id]);
  return row;
};