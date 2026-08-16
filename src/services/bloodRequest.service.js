import db from "../config/connectionDB";


exports.getAll = async () => {
  const [row] = await db.execute(
    `SELECT
    request.REQUESTID,
    request.LOCATIONID,
    request.REQUESTEDVOLUME,
    request.REASON,
    request.PRIORITYLEVEL,
    request.NEEDEDTIME,
    request.STATUS,
    request.NOTES,
    recipient.RECIPENTID,
    recipient.BLOODTYPENAME,
    user.USERID,
    user.FULLNAME,
    user.PHONENUMBER
    FROM
    BLOOD_REQUEST request
    JOIN RECIPIENT recipient ON request.RECIPENTID = recipient.RECIPENTID
    JOIN USER user ON recipient.USERID = user.USERID`
  );
  return row;
};

exports.getId = async (id) => {
  const [row] = await db.execute(
    `SELECT
    request.REQUESTID,
    request.LOCATIONID,
    request.REQUESTEDVOLUME,
    request.REASON,
    request.PRIORITYLEVEL,
    request.NEEDEDTIME,
    request.STATUS,
    request.NOTES,
    recipient.RECIPENTID,
    recipient.BLOODTYPENAME,
    user.USERID,
    user.FULLNAME,
    user.PHONENUMBER
    FROM
    BLOOD_REQUEST request
    JOIN RECIPIENT recipient ON request.RECIPENTID = recipient.RECIPENTID
    JOIN USER user ON recipient.USERID = user.USERID
    WHERE request.REQUESTID = ?`,
    [id]
  );
  return row;
};

exports.getByRecipient = async (recipientId) => {
  const [row] = await db.execute(`SELECT * FROM BLOOD_REQUEST WHERE RECIPENTID = ?`, [recipientId]);
  return row;
};

exports.getPending = async () => {
  const [row] = await db.execute(
    `SELECT
    request.REQUESTID,
    request.REQUESTEDVOLUME,
    request.REASON,
    request.PRIORITYLEVEL,
    request.NEEDEDTIME,
    request.STATUS,
    recipient.BLOODTYPENAME,
    user.FULLNAME,
    user.PHONENUMBER
    FROM
    BLOOD_REQUEST request
    JOIN RECIPIENT recipient ON request.RECIPENTID = recipient.RECIPENTID
    JOIN USER user ON recipient.USERID = user.USERID
    WHERE request.STATUS = 'Pending'
    ORDER BY request.PRIORITYLEVEL DESC, request.NEEDEDTIME ASC`
  );
  return row;
};


exports.getRecipientIdByUserId = async (userId) => {
  const [row] = await db.execute(`SELECT RECIPENTID FROM RECIPIENT WHERE USERID = ?`, [userId]);
  return row;
};

exports.add = async (requestBody) => {
  const [row] = await db.execute(
    `INSERT INTO
      BLOOD_REQUEST(RECIPENTID, LOCATIONID, REQUESTEDVOLUME, REASON, PRIORITYLEVEL, NEEDEDTIME, STATUS, NOTES, CREATEDDATE, UPDATEDDATE)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [
      requestBody.recipentId,
      requestBody.locationId || null,
      requestBody.requestedVolume,
      requestBody.reason || "",
      requestBody.priorityLevel || "Normal",
      requestBody.neededTime,
      requestBody.status || "Pending",
      requestBody.notes || "",
    ]
  );
  return row;
};

exports.update = async (id, requestBody) => {
  const [row] = await db.execute(
    `UPDATE BLOOD_REQUEST
      SET
        REQUESTEDVOLUME = ?,
        REASON = ?,
        PRIORITYLEVEL = ?,
        NEEDEDTIME = ?,
        STATUS = ?,
        NOTES = ?,
        UPDATEDDATE = NOW()
      WHERE REQUESTID = ?`,
    [
      requestBody.requestedVolume,
      requestBody.reason || "",
      requestBody.priorityLevel,
      requestBody.neededTime,
      requestBody.status,
      requestBody.notes || "",
      id,
    ]
  );
  return row;
};

exports.delete = async (id) => {
  const [row] = await db.execute(`DELETE FROM BLOOD_REQUEST WHERE REQUESTID = ?`, [id]);
  return row;
};