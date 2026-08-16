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
  const [row] = await db.execute(`SELECT * FROM REPORT WHERE REPORTID = ?`, [id]);
  return row;
};

exports.getByUser = async (userId) => {
  const [row] = await db.execute(
    `SELECT * FROM REPORT WHERE USERID = ? ORDER BY CREATEDDATE DESC`,
    [userId]
  );
  return row;
};

exports.add = async (reportBody) => {
  const [row] = await db.execute(
    `INSERT INTO REPORT(USERID, REPORTTYPE, FROMDATE, TODATE, DATA, CREATEDDATE, UPDATEDDATE)
     VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
    [reportBody.userId, reportBody.reportType, reportBody.fromDate, reportBody.toDate, reportBody.data || ""]
  );
  return row;
};

exports.update = async (id, reportBody) => {
  const [row] = await db.execute(
    `UPDATE REPORT SET REPORTTYPE = ?, FROMDATE = ?, TODATE = ?, DATA = ?, UPDATEDDATE = NOW()
     WHERE REPORTID = ?`,
    [reportBody.reportType, reportBody.fromDate, reportBody.toDate, reportBody.data || "", id]
  );
  return row;
};

exports.delete = async (id) => {
  const [row] = await db.execute(`DELETE FROM REPORT WHERE REPORTID = ?`, [id]);
  return row;
};

// ===== API THỐNG KÊ NÂNG CAO =====

exports.getDonationStats = async (fromDate, toDate) => {
  const [row] = await db.execute(
    `SELECT
      COUNT(*) AS TOTALDONATIONS,
      SUM(VOLUME) AS TOTALVOLUME,
      AVG(VOLUME) AS AVGVOLUME
     FROM DONATION
     WHERE DONATIONDATE BETWEEN ? AND ?`,
    [fromDate, toDate]
  );
  return row;
};

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

exports.getRequestStatusStats = async () => {
  const [row] = await db.execute(
    `SELECT STATUS, COUNT(*) AS TOTAL
     FROM BLOOD_REQUEST
     GROUP BY STATUS`
  );
  return row;
};

exports.getTopDonors = async (limit) => {
  const safeLimit = Number.isInteger(parseInt(limit, 10)) ? parseInt(limit, 10) : 5;
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
     LIMIT ${safeLimit}`
  );
  return row;
};

exports.generateReport = async (userId, reportType, fromDate, toDate) => {
  let statsData;

  if (reportType === "DonationSummary") {
    const [stats] = await db.execute(
      `SELECT COUNT(*) AS TOTALDONATIONS, SUM(VOLUME) AS TOTALVOLUME
       FROM DONATION WHERE DONATIONDATE BETWEEN ? AND ?`,
      [fromDate, toDate]
    );
    statsData = JSON.stringify(stats[0]);
  } else if (reportType === "RequestSummary") {
    const [stats] = await db.execute(
      `SELECT STATUS, COUNT(*) AS TOTAL FROM BLOOD_REQUEST
       WHERE CREATEDDATE BETWEEN ? AND ? GROUP BY STATUS`,
      [fromDate, toDate]
    );
    statsData = JSON.stringify(stats);
  } else {
    statsData = JSON.stringify({});
  }

  const [row] = await db.execute(
    `INSERT INTO REPORT(USERID, REPORTTYPE, FROMDATE, TODATE, DATA, CREATEDDATE, UPDATEDDATE)
     VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
    [userId, reportType, fromDate, toDate, statsData]
  );
  return row;
};