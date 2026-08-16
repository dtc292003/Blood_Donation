import db from "../config/connectionDB";


exports.getAll = async () => {
  const [row] = await db.execute(
    `SELECT
    reg.REGISTRATIONID,
    reg.REGISTRATIONDATE,
    reg.STATUS,
    reg.NOTES,
    event.EVENTID,
    event.EVENTNAME,
    event.STARTDATE,
    event.ENDDATE,
    event.LOCATION,
    donor.DONORID,
    donor.BLOODTYPENAME,
    user.FULLNAME,
    user.PHONENUMBER
    FROM
    DONATION_REGISTRATION reg
    JOIN DONATION_EVENT event ON reg.EVENTID = event.EVENTID
    JOIN DONOR donor ON reg.DONORID = donor.DONORID
    JOIN USER user ON donor.USERID = user.USERID`
  );
  return row;
};

exports.getId = async (id) => {
  const [row] = await db.execute(
    `SELECT
    reg.REGISTRATIONID,
    reg.REGISTRATIONDATE,
    reg.STATUS,
    reg.NOTES,
    event.EVENTID,
    event.EVENTNAME,
    event.STARTDATE,
    event.ENDDATE,
    event.LOCATION,
    donor.DONORID,
    donor.BLOODTYPENAME,
    user.FULLNAME,
    user.PHONENUMBER
    FROM
    DONATION_REGISTRATION reg
    JOIN DONATION_EVENT event ON reg.EVENTID = event.EVENTID
    JOIN DONOR donor ON reg.DONORID = donor.DONORID
    JOIN USER user ON donor.USERID = user.USERID
    WHERE reg.REGISTRATIONID = ?`,
    [id]
  );
  return row;
};

exports.getByEvent = async (eventId) => {
  const [row] = await db.execute(
    `SELECT
    reg.REGISTRATIONID,
    reg.REGISTRATIONDATE,
    reg.STATUS,
    reg.NOTES,
    donor.DONORID,
    donor.BLOODTYPENAME,
    user.FULLNAME,
    user.PHONENUMBER
    FROM
    DONATION_REGISTRATION reg
    JOIN DONOR donor ON reg.DONORID = donor.DONORID
    JOIN USER user ON donor.USERID = user.USERID
    WHERE reg.EVENTID = ?`,
    [eventId]
  );
  return row;
};


exports.getDonorIdByUserId = async (userId) => {
  const [row] = await db.execute(`SELECT DONORID FROM DONOR WHERE USERID = ?`, [userId]);
  return row;
};

exports.add = async (registrationBody) => {
  const [row] = await db.execute(
    `INSERT INTO
      DONATION_REGISTRATION(EVENTID, DONORID, REGISTRATIONDATE, STATUS, NOTES, CREATEDDATE, UPDATEDDATE)
      VALUES (?, ?, NOW(), ?, ?, NOW(), NOW())`,
    [
      registrationBody.eventId,
      registrationBody.donorId,
      registrationBody.status || "Pending",
      registrationBody.notes || "",
    ]
  );
  return row;
};

exports.update = async (id, registrationBody) => {
  const [row] = await db.execute(
    `UPDATE DONATION_REGISTRATION
      SET
        STATUS = ?,
        NOTES = ?,
        UPDATEDDATE = NOW()
      WHERE REGISTRATIONID = ?`,
    [registrationBody.status, registrationBody.notes || "", id]
  );
  return row;
};

exports.delete = async (id) => {
  const [row] = await db.execute(`DELETE FROM DONATION_REGISTRATION WHERE REGISTRATIONID = ?`, [id]);
  return row;
};