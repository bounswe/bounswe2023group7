import express from "express";
import verifyToken from "../utils/auth.js";
const router = express.Router();
import gamePlatformController from "../controllers/game-platform.controller.js";

router.get(
    "/search",
    verifyToken,
    gamePlatformController.searchGame
);

router.get(
    "/game",
    verifyToken,
    gamePlatformController.getPlatforms
);

router.post(
    "/platform",
    verifyToken,
    gamePlatformController.postMyPlatform
);
export default router;