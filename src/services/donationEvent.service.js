import db from "../config/connectionDB";

exports.getAll = async () => {
  const [row] = await db.execute(`SELECT * FROM DONATION_EVENT`);
  return row;
};

exports.getId = async (id) => {
  const [row] = await db.execute(`SELECT * FROM DONATION_EVENT WHERE EVENTID = ?`, [id]);
  return row;
};

exports.add = async (eventBody) => {
  const [row] = await db.execute(
    `INSERT INTO
      DONATION_EVENT(EVENTNAME, STARTDATE, ENDDATE, DESCRIPTION, LOCATION, STATUS, CREATEDDATE, UPDATEDDATE)
      VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [
      eventBody.eventName,
      eventBody.startDate,
      eventBody.endDate,
      eventBody.description || "",
      eventBody.location || "",
      eventBody.status || "Upcoming",
    ]
  );
  return row;
};

exports.update = async (id, eventBody) => {
  const [row] = await db.execute(
    `UPDATE DONATION_EVENT
      SET
        EVENTNAME = ?,
        STARTDATE = ?,
        ENDDATE = ?,
        DESCRIPTION = ?,
        LOCATION = ?,
        STATUS = ?,
        UPDATEDDATE = NOW()
      WHERE EVENTID = ?`,
    [
      eventBody.eventName,
      eventBody.startDate,
      eventBody.endDate,
      eventBody.description || "",
      eventBody.location || "",
      eventBody.status,
      id,
    ]
  );
  return row;
};

exports.delete = async (id) => {
  const [row] = await db.execute(`DELETE FROM DONATION_EVENT WHERE EVENTID = ?`, [id]);
  return row;
};