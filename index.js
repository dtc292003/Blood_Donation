import express from 'express';
import bodyParser from 'body-parser';
import userRouter from "./src/routers/user.routers";
import donorRouter from "./src/routers/donor.routers";

const app = express();
const port = 8080;

app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log('>>> run into my middleware');
  console.log(req.method);
  next();
});

app.use("/api", userRouter);
app.use("/api",donorRouter);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});