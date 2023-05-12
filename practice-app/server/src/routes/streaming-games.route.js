import streamingGamesController from "../controllers/streaming-games.controller.js";
import express from "express";
const router = express.Router();

/**
 * @openapi
 * '/api/streaming-games/most-viewed':
 *   get:
 *     summary: Get the most viewed game on Twitch.
 *     tags:
 *       - Streaming Games
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The name of the most viewed game.
 *                   example: "League of Legends"
 *                 id:
 *                   type: string
 *                   description: The ID of the most viewed game.
 *                   example: "21779"
 *       500:
 *         description: Internal Server Error
 */
router.get(
    "/most-viewed",
    streamingGamesController.getMostViewedGame
);
/**
 * @openapi
 * '/api/streaming-games/most-viewed':
 *   post:
 *     summary: Save the most viewed game on Twitch.
 *     tags:
 *       - Streaming Games
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the saved game.
 *                   example: "609d03bb64de7b3fe0ef6e67"
 *                 name:
 *                   type: string
 *                   description: The name of the saved game.
 *                   example: "League of Legends"
 *                 id:
 *                   type: string
 *                   description: The ID of the saved game.
 *                   example: "21779"
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   description: The date when the game was saved.
 *                   example: "2022-05-19T14:25:00.000Z"
 *       500:
 *         description: Internal Server Error
 *
  */
router.post(
    "/most-viewed",
    streamingGamesController.saveMostViewedGame
);
/**
 * @openapi
 * '/api/streaming-games/history-most-viewed':
 *   get:
 *     summary: Get all saved games.
 *     tags:
 *       - Streaming Games
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The ID of the saved game.
 *                     example: "609d03bb64de7b3fe0ef6e67"
 *                   name:
 *                     type: string
 *                     description: The name of the saved game.
 *                     example: "League of Legends"
 *                   id:
 *                     type: string
 *                     description: The ID of the saved game.
 *                     example: "21779"
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: The date when the game was saved.
 *                     example: "2022-05-19T14:25:00.000Z"
 *       500:
 *         description: Internal Server Error
 */

router.get(
    "/history-most-viewed",
    streamingGamesController.getSavedGames
);


export default router;
