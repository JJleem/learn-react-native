import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      logitude?: number;
      latitude?: number;
      timeStamps?: number;
      isCheck?: boolean;
    }
  }
}
