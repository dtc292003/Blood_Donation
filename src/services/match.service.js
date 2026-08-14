import db from "../config/connectionDB";

// Lấy tất cả match
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

// Lấy 1 match theo ID_MATCH
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
    WHERE m.ID_MATCH = ${idMatch}`
  );
  return row;
};

// "Lời mời đã nhận" — recipient xem ai muốn hiến cho request của mình
exports.getByRequest = async (requestId) => {
  const [row] = await db.execute(
    `SELECT
    m.ID_MATCH, m.STATUS, m.MATCH_DATE, m.ACCEPTEDDATE, m.NOTES,
    donor.DONORID, donor.BLOODTYPENAME,
    donorUser.FULLNAME AS DONORNAME, donorUser.PHONENUMBER AS DONORPHONE
    FROM \`MATCH\` m
    JOIN DONOR donor ON m.DONORID = donor.DONORID
    JOIN USER donorUser ON donor.USERID = donorUser.USERID
    WHERE m.REQUESTID = ${requestId}
    ORDER BY m.MATCH_DATE DESC`
  );
  return row;
};

// "Lời mời đã gửi" — donor xem mình đã ứng cứu (apply) cho những request nào
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
    WHERE m.DONORID = ${donorId}
    ORDER BY m.MATCH_DATE DESC`
  );
  return row;
};

// Donor bấm "Tôi muốn hiến" cho 1 request — giống gửi lời mời kết bạn
exports.apply = async (userId, matchBody) => {
  const [row] = await db.execute(
    `INSERT INTO
      \`MATCH\`(USERID, REQUESTID, DONORID, MATCH_DATE, STATUS, NOTES, CREATEDDATE, UPDATEDDATE)
      VALUES (${userId}, ${matchBody.requestId}, ${matchBody.donorId}, NOW(), 'Pending', '${matchBody.notes || ""}', NOW(), NOW())`
  );
  return row;
};

// Recipient Accept lời đề nghị hiến máu
exports.accept = async (idMatch) => {
  const [row] = await db.execute(
    `UPDATE \`MATCH\`
      SET STATUS = 'Accepted', ACCEPTEDDATE = NOW(), UPDATEDDATE = NOW()
      WHERE ID_MATCH = ${idMatch}`
  );
  return row;
};

// Recipient từ chối
exports.reject = async (idMatch) => {
  const [row] = await db.execute(
    `UPDATE \`MATCH\`
      SET STATUS = 'Rejected', UPDATEDDATE = NOW()
      WHERE ID_MATCH = ${idMatch}`
  );
  return row;
};

// Donor tự hủy lời đề nghị đã gửi (khi còn Pending)
exports.cancel = async (idMatch) => {
  const [row] = await db.execute(
    `UPDATE \`MATCH\`
      SET STATUS = 'Cancelled', UPDATEDDATE = NOW()
      WHERE ID_MATCH = ${idMatch} AND STATUS = 'Pending'`
  );
  return row;
};

// Đánh dấu đã hoàn tất (sau khi donor thực sự hiến máu xong)
exports.complete = async (idMatch) => {
  const [row] = await db.execute(
    `UPDATE \`MATCH\`
      SET STATUS = 'Completed', UPDATEDDATE = NOW()
      WHERE ID_MATCH = ${idMatch}`
  );
  return row;
};

exports.delete = async (idMatch) => {
  const [row] = await db.execute(`DELETE FROM \`MATCH\` WHERE ID_MATCH = ${idMatch}`);
  return row;
};