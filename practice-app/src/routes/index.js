import express from "express";
import favoriteGamesRoutes from "./favorite-games.routes.js";
const router = express.Router();

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
 */

router.get('/', (_, res) => {
    return res.status(200).send("Welcome to the practice app!");
});

export default router;