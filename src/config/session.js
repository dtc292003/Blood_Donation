import dotenv from 'dotenv';
dotenv.config();

import session from "express-session";
import MySQLStore from "express-mysql-session";

const MySQLSessionStore = MySQLStore(session);

const sessionStore = new MySQLSessionStore({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "blood_donation",
  createDatabaseTable: true,
});

export const sessionMiddleware = session({
  key: "blood_donation_sid",
  secret: process.env.SESSION_SECRET || "blood_donation_secret_key",
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
});