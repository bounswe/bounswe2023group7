import express from "express";
import favoriteGamesRoutes from "./favorite-games.routes.js";
import userRoutes from "./user.routes.js";
import verifyToken from "../utils/auth.js";
import gameplatformRoutes from "./game-platform.routes.js";

const router = express.Router();
router.use("/users", userRoutes);
router.use("/game-platform", gameplatformRoutes);
router.use("/favorite-games", favoriteGamesRoutes);

/**
 * @openapi
 * '/api':
 *  get:
 *      tags:
 *      - API
 *      summary: Welcome Info
 *      responses:
 *          200:
 *              description: Success
 *          401:
 *              description: Unauthorized
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      message:
 *                        type: string
 *                    example:
 *                      message: "Invalid token!"
 *          404:
 *              description: Not Found
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      message:
 *                        type: string
 *                    example:
 *                      message:  "User not found!"
 */

router.get('/', verifyToken,(req, res) => {
    console.log(req.user, req.username, req.email);
    return res.status(200).send("Welcome to the practice app!");
});

export default router;