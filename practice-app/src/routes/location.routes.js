import express from "express";
import LocationController from '../controllers/location.controller.js';


const locationRouter = express.Router();

locationRouter.get(
    "/history",
    LocationController.history
);

locationRouter.post(
    "/addLocation",
    LocationController.addLocation
);

locationRouter.get(
    "/findLocation",
    LocationController.findLocation
)

export default locationRouter