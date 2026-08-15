import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { sessionMiddleware } from './src/config/session';
import userRouter from "./src/routers/user.routers";
import donorRouter from "./src/routers/donor.routers";
import authRouter from "./src/routers/auth.routers";
import recipientRouter from "./src/routers/recipient.routers"
import donationEventRouter from "./src/routers/donationEvent.routers";
import donationRegistrationRouter from "./src/routers/donationRegistration.routers";
import donationRouter from "./src/routers/donation.routers";
import bloodTestRouter from "./src/routers/bloodTest.routers";
import bloodRequestRouter from "./src/routers/bloodRequest.routers";
import matchRouter from "./src/routers/match.router";
import roleRouter from "./src/routers/role.router";
import userRoleRouter from "./src/routers/userRole.router";
import notificationRouter from "./src/routers/notification.router";
import reportRouter from "./src/routers/report.routers";


const app = express();
const port = 8080;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(sessionMiddleware);

app.use((req, res, next) => {
  console.log('>>> run into my middleware');
  console.log(req.method);
  next();
});


app.use("/api",authRouter);
app.use("/api", userRouter);
app.use("/api",donorRouter);
app.use("/api",recipientRouter);
app.use("/api",donationEventRouter);
app.use("/api",donationRegistrationRouter);
app.use("/api",donationRouter);
app.use("/api",bloodTestRouter);
app.use("/api",bloodRequestRouter);
app.use("/api", matchRouter);
app.use("/api", roleRouter);
app.use("/api", userRoleRouter);
app.use("/api", notificationRouter);
app.use("/api",reportRouter);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});