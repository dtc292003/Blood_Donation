import db from "../config/connectionDB";


exports.getAll = async () => {
  const [row] = await db.execute(
    `SELECT
    donation.DONATIONID,
    donation.DONATIONDATE,
    donation.VOLUME,
    donation.HEALTHSTATUS,
    donation.NOTES,
    user.USERID,
    user.FULLNAME,
    user.PHONENUMBER,
    reg.REGISTRATIONID,
    reg.EVENTID,
    event.EVENTNAME
    FROM
    DONATION donation
    JOIN USER user ON donation.USERID = user.USERID
    JOIN DONATION_REGISTRATION reg ON donation.REGISTRATIONID = reg.REGISTRATIONID
    JOIN DONATION_EVENT event ON reg.EVENTID = event.EVENTID`
  );
  return row;
};

exports.getId = async (id) => {
  const [row] = await db.execute(
    `SELECT
    donation.DONATIONID,
    donation.DONATIONDATE,
    donation.VOLUME,
    donation.HEALTHSTATUS,
    donation.NOTES,
    user.USERID,
    user.FULLNAME,
    user.PHONENUMBER,
    reg.REGISTRATIONID,
    reg.EVENTID,
    event.EVENTNAME
    FROM
    DONATION donation
    JOIN USER user ON donation.USERID = user.USERID
    JOIN DONATION_REGISTRATION reg ON donation.REGISTRATIONID = reg.REGISTRATIONID
    JOIN DONATION_EVENT event ON reg.EVENTID = event.EVENTID
    WHERE donation.DONATIONID = ?`,
    [id]
  );
  return row;
};

exports.getByUser = async (userId) => {
  const [row] = await db.execute(
    `SELECT
    donation.DONATIONID,
    donation.DONATIONDATE,
    donation.VOLUME,
    donation.HEALTHSTATUS,
    donation.NOTES,
    reg.EVENTID,
    event.EVENTNAME
    FROM
    DONATION donation
    JOIN DONATION_REGISTRATION reg ON donation.REGISTRATIONID = reg.REGISTRATIONID
    JOIN DONATION_EVENT event ON reg.EVENTID = event.EVENTID
    WHERE donation.USERID = ?`,
    [userId]
  );
  return row;
};

exports.add = async (donationBody) => {
  const [row] = await db.execute(
    `INSERT INTO
      DONATION(USERID, REGISTRATIONID, DONATIONDATE, VOLUME, HEALTHSTATUS, NOTES, CREATEDDATE, UPDATEDDATE)
      VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [
      donationBody.userId,
      donationBody.registrationId,
      donationBody.donationDate,
      donationBody.volume,
      donationBody.healthStatus || "",
      donationBody.notes || "",
    ]
  );
  return row;
};

exports.update = async (id, donationBody) => {
  const [row] = await db.execute(
    `UPDATE DONATION
      SET
        DONATIONDATE = ?,
        VOLUME = ?,
        HEALTHSTATUS = ?,
        NOTES = ?,
        UPDATEDDATE = NOW()
      WHERE DONATIONID = ?`,
    [
      donationBody.donationDate,
      donationBody.volume,
      donationBody.healthStatus || "",
      donationBody.notes || "",
      id,
    ]
  );
  return row;
};

exports.delete = async (id) => {
  const [row] = await db.execute(`DELETE FROM DONATION WHERE DONATIONID = ?`, [id]);
  return row;
};