import express from "express";
import verifyToken from "../utils/auth.js";
const router = express.Router();
import gamePlatformController from "../controllers/game-platform.controller.js";

/**
 * @openapi
 * '/api/game-platforms/search':
 *  get:
 *      tags:
 *      - Game Platforms
 *      summary: Search a game
 *      parameters:
 *          - in: query
 *            name: title
 *            description: The search string    
 *            required: true
 *            type: string
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object      
 *                              properties:
 *                                  game_id:
 *                                      type: number
 *                                  moby_url:
 *                                      type: string
 *                                  title:   
 *                                      type: string
 *                              example:
 *                                  game_id: 78
 *                                  moby_url: "https://www.mobygames.com/game/78/prince-of-persia-2-the-shadow-the-flame/"
 *                                  title: "Prince of Persia 2: The Shadow & The Flame"
 *          400:
 *              description: Search result is empty
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                          example:
 *                              message: "You should not give an empty input."
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                          example: 
 *                              message: "Provide an access token" 
 *          404:
 *              description: Search result is empty
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                              message:
 *                                  type: string
 *                          example:
 *                              error: "No game found!"
 *                              message: "You should use right keywords."
 *          422:
 *              description: Search result is empty
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                              message:
 *                                  type: string
 *                          example:
 *                              error: "Title too long"
 *                              message: "Title filter must be <= 128 characters."
 *          429:
 *              description: Received more than permitted request
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                              message:
 *                                  type: string
 *                          example:
 *                              error: "Too many requests"
 *                              message: "You should be patient"
 *          500:
 *              description: Internal Server Error
 */
router.get(
    "/search",
    verifyToken,
    gamePlatformController.searchGame
);
/**
 * @openapi
 * '/api/game-platforms/game':
 *  get:
 *      tags:
 *      - Game Platforms
 *      summary: Get Platforms of a Game
 *      parameters:
 *          - in: query
 *            name: id
 *            description: Get Game from id   
 *            required: true
 *            type: string
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object      
 *                              properties:
 *                                  platforms:
 *                                      type: array
 *                                      items:
 *                                          first_release_date:
 *                                              type: string
 *                                          platform_id:
 *                                              type: number
 *                                          platform_name:
 *                                              type: string
 *                                      example:
 *                                          game_id: 78
 *                                          moby_url: "https://www.mobygames.com/game/78/prince-of-persia-2-the-shadow-the-flame/"
 *                                          title: "Prince of Persia 2: The Shadow & The Flame"
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                          example: 
 *                              message: "Provide an access token" 
 *          404:
 *              description: Game is not found
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                              message:
 *                                  type: string
 *                          example:
 *                              error: "No game found!"
 *                              message: "You should use right keywords."
 *          429:
 *              description: Received more than permitted request
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                              message:
 *                                  type: string
 *                          example:
 *                              error: "Too many requests"
 *                              message: "You should be patient"
 *          500:
 *              description: Internal Server Error
 */
router.get(
    "/game",
    verifyToken,
    gamePlatformController.getPlatforms
);
/**
 * @openapi
 * '/api/game-platforms':
 *  post:
 *      tags:
 *      - Game Platforms
 *      summary: Add a platform to your account
 *      parameters:
 *          - in: query
 *            name: title
 *            description: name of the platform
 *            required: true
 *            type: string
 *            example: xbox
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message: 
 *                                  type: string
 *                              example:
 *                                  message: "The game is added to the favorites"
 *          400:
 *              description: Search result is empty
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                          example: 
 *                              message: "You should not give an empty input."
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                          example: 
 *                              message: "Provide an access token" 
 *          404:
 *              description: Game is not found
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                              message:
 *                                  type: string
 *                          example:
 *                              error: "No game found!"
 *                              message: "You should use right keywords."
 *          409:
 *              description: Conflict
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                          example:
 *                              message: "You have already added this platform"
 *          500:
 *              description: Internal Server Error
 */
router.post(
    "/platform",
    verifyToken,
    gamePlatformController.postMyPlatform
);
export default router;