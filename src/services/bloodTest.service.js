import db from "../config/connectionDB";

exports.getAll = async () => {
  const [row] = await db.execute(
    `SELECT
    test.TESTID,
    test.HEMOGLOBIN,
    test.HIV,
    test.HEPATITISB,
    test.HEPATITISC,
    test.SYPHILIS,
    test.CONCLUSION,
    test.TESTDATE,
    test.NOTES,
    donation.DONATIONID,
    donation.DONATIONDATE,
    donation.VOLUME,
    user.USERID,
    user.FULLNAME
    FROM
    BLOOD_TEST test
    JOIN DONATION donation ON test.DONATIONID = donation.DONATIONID
    JOIN USER user ON donation.USERID = user.USERID`
  );
  return row;
};

exports.getId = async (id) => {
  const [row] = await db.execute(
    `SELECT
    test.TESTID,
    test.HEMOGLOBIN,
    test.HIV,
    test.HEPATITISB,
    test.HEPATITISC,
    test.SYPHILIS,
    test.CONCLUSION,
    test.TESTDATE,
    test.NOTES,
    donation.DONATIONID,
    donation.DONATIONDATE,
    donation.VOLUME,
    user.USERID,
    user.FULLNAME
    FROM
    BLOOD_TEST test
    JOIN DONATION donation ON test.DONATIONID = donation.DONATIONID
    JOIN USER user ON donation.USERID = user.USERID
    WHERE test.TESTID = ?`,
    [id]
  );
  return row;
};

exports.getByDonation = async (donationId) => {
  const [row] = await db.execute(`SELECT * FROM BLOOD_TEST WHERE DONATIONID = ?`, [donationId]);
  return row;
};

exports.add = async (testBody) => {
  const [row] = await db.execute(
    `INSERT INTO
      BLOOD_TEST(DONATIONID, HEMOGLOBIN, HIV, HEPATITISB, HEPATITISC, SYPHILIS, CONCLUSION, TESTDATE, NOTES, CREATEDDATE, UPDATEDDATE)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [
      testBody.donationId,
      testBody.hemoglobin,
      testBody.hiv,
      testBody.hepatitisB,
      testBody.hepatitisC,
      testBody.syphilis,
      testBody.conclusion,
      testBody.testDate,
      testBody.notes || "",
    ]
  );
  return row;
};

exports.update = async (id, testBody) => {
  const [row] = await db.execute(
    `UPDATE BLOOD_TEST
      SET
        HEMOGLOBIN = ?,
        HIV = ?,
        HEPATITISB = ?,
        HEPATITISC = ?,
        SYPHILIS = ?,
        CONCLUSION = ?,
        TESTDATE = ?,
        NOTES = ?,
        UPDATEDDATE = NOW()
      WHERE TESTID = ?`,
    [
      testBody.hemoglobin,
      testBody.hiv,
      testBody.hepatitisB,
      testBody.hepatitisC,
      testBody.syphilis,
      testBody.conclusion,
      testBody.testDate,
      testBody.notes || "",
      id,
    ]
  );
  return row;
};

exports.delete = async (id) => {
  const [row] = await db.execute(`DELETE FROM BLOOD_TEST WHERE TESTID = ?`, [id]);
  return row;
};