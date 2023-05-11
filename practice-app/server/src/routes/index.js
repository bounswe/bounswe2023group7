import express from "express";
import gameStoresRouter from "./gameStores.routes.js";
const router = express.Router();

router.use("/gameprices",gameStoresRouter);

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