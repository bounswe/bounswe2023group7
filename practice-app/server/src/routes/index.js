import express from "express";
const router = express.Router();
import genre from './genre.routes.js';
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

router.use('/genre', genre);

export default router;