import express from "express";
const router = express.Router();
import randomGameController from "../controllers/random-game.controller.js";


/**
 * @openapi
 * '/api/random-game':
 * post:
 *     tags:
 *       - Random Game
 *     summary: Returns a random game from Steam 
 *              library and adds this to the history.
 *     responses:
 *         200:
 *             description: successful operation
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     short_descirption:
 *                       type: string
 *                     headerImage:
 *                       type: string
 *                     price:
 *                       type: number
 *     500:
 *         description: Internal Server Error   
 */
router.post(
    "/",
    randomGameController.randomGameHandler
);


/**
 * @openapi
 * '/api/random-game'
 * get:
 *    tags: Random Game
 *    summary: Returns random game history by user's email
 *    responses:
 *        200:
 *            description: Succesful operation
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                        type: object
 *                        properties:
 *                            _id:
 *                                type: String
 *                            appId:
 *                                type: number
 *                            name:
 *                                type: String
 *                            shortDescription:
 *                                type: String
 *                            headerImage:
 *                                type: String
 *                            price: 
 *                                type: String
 *                            email: 
 *                                type: String
 *                        example: 
 *                            _id: "645bc024e8a8a55b7ef093c9"
 *                            appId: 1386910
 *                            name: "Koncolos"
 *                            shortDescription: "&quot;Do you know a monster that dwells around here?&quot; she asked. An ordinary barkeepers' journey, intertwined with the only survivor from a shrouded monster hunter company, started with this question."
 *                            headerImage: "https://cdn.akamai.steamstatic.com/steam/apps/1912490/header.jpg?t=1659947904"
 *                            price: "54,00 TL"
 *                            email "mtk@gmail.com"
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message: 
 *                                  type: String
 *                              example:
 *                                  message: "Provide an access token"
 * 
 */
router.get(
    "/",
    randomGameController.getHistoryByEmailHandler
)

export default router;