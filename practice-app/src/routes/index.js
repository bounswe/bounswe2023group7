import express from "express";
const router = express.Router();

import locationRouter from './location.routes.js'
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



export default router;