import express from "express";
import gameStoresRouter from "./gameStores.routes.js";
import favoriteGamesRoutes from "./favorite-games.routes.js";
import userRoutes from "./user.routes.js";
import verifyToken from "../utils/auth.js";
import locationRouter from './location.routes.js'

const router = express.Router();
router.use("/users", userRoutes);
router.use("/favorite-games", favoriteGamesRoutes);
router.use("/gameprices",gameStoresRouter);
router.use("/location", locationRouter);
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



router.get('/', verifyToken,(req, res) => {
    console.log(req.user, req.username, req.email);
    return res.status(200).send("Welcome to the practice app!");
});

export default router;