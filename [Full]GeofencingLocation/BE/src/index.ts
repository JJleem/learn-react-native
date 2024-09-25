import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import locationRouter from "./router/locationRouter";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
dotenv.config();

// 몽고db 연결

mongoose
  .connect(process.env.DB_CONNECT || "")
  .then(() => console.log("Mongo DB success connected"))
  .catch((err) => console.log(err));

//

app.use("/locationdata", locationRouter);

// 서버 시작
app.listen(PORT, () => {
  const host = process.env.HOST || "192.168.0.68";
  console.log(`Server is running on http://${host}:${PORT}`);
});
