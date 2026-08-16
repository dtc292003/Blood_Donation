import db from "../config/connectionDB";

exports.getAll = async () => {
  const [row] = await db.execute(
    `SELECT n.*, user.FULLNAME
     FROM NOTIFICATION n
     JOIN USER user ON n.USERID = user.USERID
     ORDER BY n.CREATEDDATE DESC`
  );
  return row;
};

exports.getId = async (id) => {
  const [row] = await db.execute(`SELECT * FROM NOTIFICATION WHERE NOTIFICATIONID = ?`, [id]);
  return row;
};

exports.getByUser = async (userId) => {
  const [row] = await db.execute(
    `SELECT * FROM NOTIFICATION WHERE USERID = ? ORDER BY CREATEDDATE DESC`,
    [userId]
  );
  return row;
};

exports.getUnreadByUser = async (userId) => {
  const [row] = await db.execute(
    `SELECT * FROM NOTIFICATION WHERE USERID = ? AND ISREAD = 0 ORDER BY CREATEDDATE DESC`,
    [userId]
  );
  return row;
};

exports.add = async (notiBody) => {
  const [row] = await db.execute(
    `INSERT INTO NOTIFICATION(USERID, TITLE, CONTENT, NOTIFICATIONTYPE, ISREAD, CREATEDDATE, UPDATEDDATE)
     VALUES (?, ?, ?, ?, 0, NOW(), NOW())`,
    [notiBody.userId, notiBody.title, notiBody.content || "", notiBody.notificationType || "General"]
  );
  return row;
};

exports.update = async (id, notiBody) => {
  const [row] = await db.execute(
    `UPDATE NOTIFICATION SET TITLE = ?, CONTENT = ?, UPDATEDDATE = NOW()
     WHERE NOTIFICATIONID = ?`,
    [notiBody.title, notiBody.content || "", id]
  );
  return row;
};

exports.markAsRead = async (id) => {
  const [row] = await db.execute(
    `UPDATE NOTIFICATION SET ISREAD = 1, UPDATEDDATE = NOW() WHERE NOTIFICATIONID = ?`,
    [id]
  );
  return row;
};

exports.markAllAsRead = async (userId) => {
  const [row] = await db.execute(
    `UPDATE NOTIFICATION SET ISREAD = 1, UPDATEDDATE = NOW() WHERE USERID = ? AND ISREAD = 0`,
    [userId]
  );
  return row;
};

exports.delete = async (id) => {
  const [row] = await db.execute(`DELETE FROM NOTIFICATION WHERE NOTIFICATIONID = ?`, [id]);
  return row;
};