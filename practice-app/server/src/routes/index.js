import express from "express";
import genre from './genre.routes.js';
import gameStoresRouter from "./gameStores.routes.js";
import favoriteGamesRoutes from "./favorite-games.routes.js";
import userRoutes from "./user.routes.js";
import randomGameRoutes from "./random-game.routes.js"
import verifyToken from "../utils/auth.js";
import streamingGamesRoutes from "./streaming-games.route.js";
import eventRouter from "./events.routes.js";
import gameplatformRoutes from "./game-platform.routes.js";
import locationRouter from './location.routes.js'

const router = express.Router();
router.use("/users", userRoutes);
router.use("/game-platform", gameplatformRoutes);
router.use("/favorite-games", favoriteGamesRoutes);
router.use("/streaming-games", streamingGamesRoutes);
router.use("/events", eventRouter);
router.use("/gameprices",gameStoresRouter);
router.use("/location", locationRouter);
router.use('/random-game', verifyToken, randomGameRoutes);
router.use('/', genre);

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
router.get('/', verifyToken,(req, res) => {
    console.log(req.user, req.username, req.email);
    return res.status(200).send("Welcome to the practice app!");
});


export default router;