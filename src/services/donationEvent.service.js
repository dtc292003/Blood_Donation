import db from "../config/connectionDB";

exports.getAll = async () => {
  const [row, fields] = await db.execute(`SELECT * FROM DONATION_EVENT`);
  return row;
};

exports.getId = async (id) => {
  const [row, fields] = await db.execute(
    `SELECT * FROM DONATION_EVENT WHERE EVENTID = ${id}`
  );
  return row;
};

exports.add = async (eventBody) => {
  const [row, fields] = await db.execute(
    `INSERT INTO
      DONATION_EVENT(EVENTNAME, STARTDATE, ENDDATE, DESCRIPTION, LOCATION, STATUS, CREATEDDATE, UPDATEDDATE)
      VALUES ('${eventBody.eventName}', '${eventBody.startDate}', '${eventBody.endDate}', '${eventBody.description || ""}', '${eventBody.location || ""}', '${eventBody.status || "Upcoming"}', NOW(), NOW())`
  );
  return row;
};

exports.update = async (id, eventBody) => {
  const [row, fields] = await db.execute(
    `UPDATE DONATION_EVENT
      SET
        EVENTNAME = '${eventBody.eventName}',
        STARTDATE = '${eventBody.startDate}',
        ENDDATE = '${eventBody.endDate}',
        DESCRIPTION = '${eventBody.description || ""}',
        LOCATION = '${eventBody.location || ""}',
        STATUS = '${eventBody.status}',
        UPDATEDDATE = NOW()
      WHERE EVENTID = ${id}`
  );
  return row;
};

exports.delete = async (id) => {
  const [row, fields] = await db.execute(`DELETE FROM DONATION_EVENT WHERE EVENTID = ${id}`);
  return row;
};