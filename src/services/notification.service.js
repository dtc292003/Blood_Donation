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
  const [row] = await db.execute(`SELECT * FROM NOTIFICATION WHERE NOTIFICATIONID = ${id}`);
  return row;
};

// Lấy tất cả thông báo của 1 user (đã đọc + chưa đọc)
exports.getByUser = async (userId) => {
  const [row] = await db.execute(
    `SELECT * FROM NOTIFICATION WHERE USERID = ${userId} ORDER BY CREATEDDATE DESC`
  );
  return row;
};

// Chỉ lấy thông báo chưa đọc — dùng để hiện badge số lượng
exports.getUnreadByUser = async (userId) => {
  const [row] = await db.execute(
    `SELECT * FROM NOTIFICATION WHERE USERID = ${userId} AND ISREAD = 0 ORDER BY CREATEDDATE DESC`
  );
  return row;
};

exports.add = async (notiBody) => {
  const [row] = await db.execute(
    `INSERT INTO NOTIFICATION(USERID, TITLE, CONTENT, NOTIFICATIONTYPE, ISREAD, CREATEDDATE, UPDATEDDATE)
     VALUES (${notiBody.userId}, '${notiBody.title}', '${notiBody.content || ""}', '${notiBody.notificationType || "General"}', 0, NOW(), NOW())`
  );
  return row;
};

exports.update = async (id, notiBody) => {
  const [row] = await db.execute(
    `UPDATE NOTIFICATION SET TITLE = '${notiBody.title}', CONTENT = '${notiBody.content || ""}', UPDATEDDATE = NOW()
     WHERE NOTIFICATIONID = ${id}`
  );
  return row;
};

// Đánh dấu 1 thông báo đã đọc
exports.markAsRead = async (id) => {
  const [row] = await db.execute(
    `UPDATE NOTIFICATION SET ISREAD = 1, UPDATEDDATE = NOW() WHERE NOTIFICATIONID = ${id}`
  );
  return row;
};

// Đánh dấu tất cả thông báo của 1 user là đã đọc
exports.markAllAsRead = async (userId) => {
  const [row] = await db.execute(
    `UPDATE NOTIFICATION SET ISREAD = 1, UPDATEDDATE = NOW() WHERE USERID = ${userId} AND ISREAD = 0`
  );
  return row;
};

exports.delete = async (id) => {
  const [row] = await db.execute(`DELETE FROM NOTIFICATION WHERE NOTIFICATIONID = ${id}`);
  return row;
};