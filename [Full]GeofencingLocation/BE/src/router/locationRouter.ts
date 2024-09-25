import express from "express";

import {
  createLocation,
  getAllLocations,
  getLocation,
} from "../controllers/locationController";

const locationRouter = express.Router();
locationRouter.route("/:id").get(getLocation);
locationRouter.route("/").post(createLocation);
locationRouter.route("/").get(getAllLocations);

export default locationRouter;
