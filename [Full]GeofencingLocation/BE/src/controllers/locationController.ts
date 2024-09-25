import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { Location } from "../models/locationModels";

export const getLocation = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const location = await Location.findById(id);
    if (!location) {
      res.status(404).json({ message: "Location not found" });
      return;
    }
    res.status(200).json(location);
  }
);

export const createLocation = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { latitude, longitude, timeStamps, isCheck } = req.body;
    await Location.deleteMany({}); // 모든 데이터 삭제
    console.log("Received location data:", {
      latitude,
      longitude,
      timeStamps,
      isCheck,
    });

    const newLocation = new Location({
      latitude,
      longitude,
      timeStamps,
      isCheck,
      createdAt: new Date(),
    });
    const savedLocation = await newLocation.save();

    res.status(201).json(savedLocation);
  }
);

export const getAllLocations = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const locations = await Location.find(); // 모든 위치 데이터 가져오기
    res.status(200).json(locations); // 클라이언트에 응답
  }
);
