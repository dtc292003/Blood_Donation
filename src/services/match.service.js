import db from "../config/connectionDB";


exports.getAll = async () => {
  const [row] = await db.execute(
    `SELECT
    m.ID_MATCH, m.STATUS, m.MATCH_DATE, m.ACCEPTEDDATE, m.NOTES,
    request.REQUESTID, request.REASON, request.PRIORITYLEVEL, request.STATUS AS REQUESTSTATUS,
    donor.DONORID, donor.BLOODTYPENAME,
    donorUser.FULLNAME AS DONORNAME, donorUser.PHONENUMBER AS DONORPHONE,
    recipient.RECIPENTID,
    recipientUser.FULLNAME AS RECIPIENTNAME
    FROM \`MATCH\` m
    JOIN BLOOD_REQUEST request ON m.REQUESTID = request.REQUESTID
    JOIN DONOR donor ON m.DONORID = donor.DONORID
    JOIN USER donorUser ON donor.USERID = donorUser.USERID
    JOIN RECIPIENT recipient ON request.RECIPENTID = recipient.RECIPENTID
    JOIN USER recipientUser ON recipient.USERID = recipientUser.USERID`
  );
  return row;
};


exports.getId = async (idMatch) => {
  const [row] = await db.execute(
    `SELECT
    m.ID_MATCH, m.STATUS, m.MATCH_DATE, m.ACCEPTEDDATE, m.NOTES,
    request.REQUESTID, request.REASON, request.PRIORITYLEVEL,
    donor.DONORID, donor.BLOODTYPENAME,
    donorUser.FULLNAME AS DONORNAME, donorUser.PHONENUMBER AS DONORPHONE,
    recipientUser.FULLNAME AS RECIPIENTNAME
    FROM \`MATCH\` m
    JOIN BLOOD_REQUEST request ON m.REQUESTID = request.REQUESTID
    JOIN DONOR donor ON m.DONORID = donor.DONORID
    JOIN USER donorUser ON donor.USERID = donorUser.USERID
    JOIN RECIPIENT recipient ON request.RECIPENTID = recipient.RECIPENTID
    JOIN USER recipientUser ON recipient.USERID = recipientUser.USERID
    WHERE m.ID_MATCH = ?`,
    [idMatch]
  );
  return row;
};


exports.getByRequest = async (requestId) => {
  const [row] = await db.execute(
    `SELECT
    m.ID_MATCH, m.STATUS, m.MATCH_DATE, m.ACCEPTEDDATE, m.NOTES,
    donor.DONORID, donor.BLOODTYPENAME,
    donorUser.FULLNAME AS DONORNAME,
    CASE WHEN m.STATUS = 'Accepted' THEN donorUser.PHONENUMBER ELSE NULL END AS DONORPHONE
    FROM \`MATCH\` m
    JOIN DONOR donor ON m.DONORID = donor.DONORID
    JOIN USER donorUser ON donor.USERID = donorUser.USERID
    WHERE m.REQUESTID = ?
    ORDER BY m.MATCH_DATE DESC`,
    [requestId]
  );
  return row;
};


exports.getByDonor = async (donorId) => {
  const [row] = await db.execute(
    `SELECT
    m.ID_MATCH, m.STATUS, m.MATCH_DATE, m.ACCEPTEDDATE, m.NOTES,
    request.REQUESTID, request.REASON, request.PRIORITYLEVEL, request.NEEDEDTIME,
    recipientUser.FULLNAME AS RECIPIENTNAME
    FROM \`MATCH\` m
    JOIN BLOOD_REQUEST request ON m.REQUESTID = request.REQUESTID
    JOIN RECIPIENT recipient ON request.RECIPENTID = recipient.RECIPENTID
    JOIN USER recipientUser ON recipient.USERID = recipientUser.USERID
    WHERE m.DONORID = ?
    ORDER BY m.MATCH_DATE DESC`,
    [donorId]
  );
  return row;
};


exports.apply = async (userId, matchBody) => {
  const [row] = await db.execute(
    `INSERT INTO
      \`MATCH\`(USERID, REQUESTID, DONORID, MATCH_DATE, STATUS, NOTES, CREATEDDATE, UPDATEDDATE)
      VALUES (?, ?, ?, NOW(), 'Pending', ?, NOW(), NOW())`,
    [userId, matchBody.requestId, matchBody.donorId, matchBody.notes || ""]
  );
  return row;
};


exports.getDonorIdByUserId = async (userId) => {
  const [row] = await db.execute(`SELECT DONORID FROM DONOR WHERE USERID = ?`, [userId]);
  return row;
};


exports.accept = async (idMatch) => {
  const [row] = await db.execute(
    `UPDATE \`MATCH\`
      SET STATUS = 'Accepted', ACCEPTEDDATE = NOW(), UPDATEDDATE = NOW()
      WHERE ID_MATCH = ?`,
    [idMatch]
  );
  return row;
};

exports.reject = async (idMatch) => {
  const [row] = await db.execute(
    `UPDATE \`MATCH\`
      SET STATUS = 'Rejected', UPDATEDDATE = NOW()
      WHERE ID_MATCH = ?`,
    [idMatch]
  );
  return row;
};

exports.cancel = async (idMatch) => {
  const [row] = await db.execute(
    `UPDATE \`MATCH\`
      SET STATUS = 'Cancelled', UPDATEDDATE = NOW()
      WHERE ID_MATCH = ? AND STATUS = 'Pending'`,
    [idMatch]
  );
  return row;
};

exports.complete = async (idMatch) => {
  const [row] = await db.execute(
    `UPDATE \`MATCH\`
      SET STATUS = 'Completed', UPDATEDDATE = NOW()
      WHERE ID_MATCH = ?`,
    [idMatch]
  );
  return row;
};

exports.delete = async (idMatch) => {
  const [row] = await db.execute(`DELETE FROM \`MATCH\` WHERE ID_MATCH = ?`, [idMatch]);
  return row;
};