import { timeStamp } from "console";
import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  latitude: { type: mongoose.Schema.Types.Number },
  longitude: { type: mongoose.Schema.Types.Number },
  timeStamps: { type: mongoose.Schema.Types.Number },
  isCheck: { type: Boolean, default: false },
});

export const Location = mongoose.model("Location", locationSchema);
