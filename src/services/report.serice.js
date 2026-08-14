import db from "../config/connectionDB";

exports.getAll = async () => {
  const [row] = await db.execute(
    `SELECT r.*, user.FULLNAME
     FROM REPORT r
     JOIN USER user ON r.USERID = user.USERID
     ORDER BY r.CREATEDDATE DESC`
  );
  return row;
};

exports.getId = async (id) => {
  const [row] = await db.execute(`SELECT * FROM REPORT WHERE REPORTID = ${id}`);
  return row;
};

exports.getByUser = async (userId) => {
  const [row] = await db.execute(
    `SELECT * FROM REPORT WHERE USERID = ${userId} ORDER BY CREATEDDATE DESC`
  );
  return row;
};

exports.add = async (reportBody) => {
  const [row] = await db.execute(
    `INSERT INTO REPORT(USERID, REPORTTYPE, FROMDATE, TODATE, DATA, CREATEDDATE, UPDATEDDATE)
     VALUES (${reportBody.userId}, '${reportBody.reportType}', '${reportBody.fromDate}', '${reportBody.toDate}', '${reportBody.data || ""}', NOW(), NOW())`
  );
  return row;
};

exports.update = async (id, reportBody) => {
  const [row] = await db.execute(
    `UPDATE REPORT SET REPORTTYPE = '${reportBody.reportType}', FROMDATE = '${reportBody.fromDate}', TODATE = '${reportBody.toDate}', DATA = '${reportBody.data || ""}', UPDATEDDATE = NOW()
     WHERE REPORTID = ${id}`
  );
  return row;
};

exports.delete = async (id) => {
  const [row] = await db.execute(`DELETE FROM REPORT WHERE REPORTID = ${id}`);
  return row;
};

// ===== API THỐNG KÊ NÂNG CAO =====

// Tổng số lượt hiến máu + tổng thể tích trong khoảng thời gian
exports.getDonationStats = async (fromDate, toDate) => {
  const [row] = await db.execute(
    `SELECT
      COUNT(*) AS TOTALDONATIONS,
      SUM(VOLUME) AS TOTALVOLUME,
      AVG(VOLUME) AS AVGVOLUME
     FROM DONATION
     WHERE DONATIONDATE BETWEEN '${fromDate}' AND '${toDate}'`
  );
  return row;
};

// Phân bố số lượt hiến theo nhóm máu
exports.getBloodTypeDistribution = async () => {
  const [row] = await db.execute(
    `SELECT
      donor.BLOODTYPENAME,
      COUNT(donation.DONATIONID) AS TOTALDONATIONS,
      SUM(donation.VOLUME) AS TOTALVOLUME
     FROM DONATION donation
     JOIN USER user ON donation.USERID = user.USERID
     JOIN DONOR donor ON donor.USERID = user.USERID
     GROUP BY donor.BLOODTYPENAME
     ORDER BY TOTALDONATIONS DESC`
  );
  return row;
};

// Thống kê request theo trạng thái (Pending/Approved/Fulfilled/Rejected)
exports.getRequestStatusStats = async () => {
  const [row] = await db.execute(
    `SELECT STATUS, COUNT(*) AS TOTAL
     FROM BLOOD_REQUEST
     GROUP BY STATUS`
  );
  return row;
};

// Top donor hiến máu nhiều nhất
exports.getTopDonors = async (limit) => {
  const [row] = await db.execute(
    `SELECT
      user.FULLNAME, donor.DONORID, donor.BLOODTYPENAME,
      COUNT(donation.DONATIONID) AS TOTALDONATIONS,
      SUM(donation.VOLUME) AS TOTALVOLUME
     FROM DONATION donation
     JOIN DONOR donor ON donation.USERID = donor.USERID
     JOIN USER user ON donor.USERID = user.USERID
     GROUP BY donor.DONORID
     ORDER BY TOTALDONATIONS DESC
     LIMIT ${limit || 5}`
  );
  return row;
};

// Tự sinh 1 report (snapshot dữ liệu thống kê, lưu lại thành record REPORT)
exports.generateReport = async (userId, reportType, fromDate, toDate) => {
  let statsData;

  if (reportType === "DonationSummary") {
    const [stats] = await db.execute(
      `SELECT COUNT(*) AS TOTALDONATIONS, SUM(VOLUME) AS TOTALVOLUME
       FROM DONATION WHERE DONATIONDATE BETWEEN '${fromDate}' AND '${toDate}'`
    );
    statsData = JSON.stringify(stats[0]);
  } else if (reportType === "RequestSummary") {
    const [stats] = await db.execute(
      `SELECT STATUS, COUNT(*) AS TOTAL FROM BLOOD_REQUEST
       WHERE CREATEDDATE BETWEEN '${fromDate}' AND '${toDate}' GROUP BY STATUS`
    );
    statsData = JSON.stringify(stats);
  } else {
    statsData = JSON.stringify({});
  }

  const [row] = await db.execute(
    `INSERT INTO REPORT(USERID, REPORTTYPE, FROMDATE, TODATE, DATA, CREATEDDATE, UPDATEDDATE)
     VALUES (${userId}, '${reportType}', '${fromDate}', '${toDate}', '${statsData.replace(/'/g, "''")}', NOW(), NOW())`
  );
  return row;
};