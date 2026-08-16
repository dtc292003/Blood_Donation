import dotenv from 'dotenv';
dotenv.config();

import session from "express-session";
import MySQLStore from "express-mysql-session";

const MySQLSessionStore = MySQLStore(session);

if (!process.env.SESSION_SECRET) {
  throw new Error(
    "SESSION_SECRET is not set in .env. Set it to a long random string, e.g. run: node -e \"console.log(require('crypto').randomBytes(64).toString('hex'))\" and paste the result into .env"
  );
}

const sessionStore = new MySQLSessionStore({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "blood_donation",
  createDatabaseTable: true,
});

const isProduction = process.env.NODE_ENV === "production";

export const sessionMiddleware = session({
  key: "blood_donation_sid",
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
});