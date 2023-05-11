import express from "express";
const router = express.Router();
import favoriteGamesController from "../controllers/favorite-games.controller.js";
import verifyToken from "../utils/auth.js";
/**
 * @openapi
 * '/api/favorite-games/search':
 *  get:
 *      tags:
 *      - Favorite Games
 *      summary: Search a game
 *      parameters:
 *          - in: query
 *            name: searchValue
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
 *                                  appid:
 *                                      type: string
 *                                  name:
 *                                      type: string
 *                                  icon:   
 *                                      type: string
 *                                  logo:
 *                                      type: string 
 *                              example:
 *                                  appid: 730
 *                                  name: "Counter-Strike: Global Offensive"
 *                                  icon: "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/730/69f7ebe2735c366c65c0b33dae00e12dc40edbe4.jpg"
 *                                  logo: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/capsule_184x69.jpg"
 *          404:
 *              description: Search result is empty
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              error:
 *                              type: string
 *                          example:
 *                              error: "No game found!"
 *          500:
 *              description: Internal Server Error
 */
router.get(
    "/search",
    favoriteGamesController.searchGamesHandler
);
/**
 * @openapi
 * '/api/favorite-games':
 *  post:
 *      tags:
 *      - Favorite Games
 *      summary: Add a game to favorites
 *      parameters:
 *          - in: query
 *            name: appId
 *            description: Steam appId of the game  
 *            required: true
 *            type: number
 *            example: 730
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
 *                              created:
 *                                  type: object
 *                                  properties:
 *                                      appId:
 *                                          type: number
 *                                      name:
 *                                          type: string
 *                                      header_image:
 *                                          type: string
 *                                      email:
 *                                          type: string
 *                                      _id:
 *                                          type: string
 *                          example:
 *                              message: "The game is added to the favorites"
 *                              created:
 *                                  appId: 730
 *                                  name: "Counter-Strike: Global Offensive"
 *                                  header_image: "https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg?t=1683566799"
 *                                  email: "omersafakbebek@gmail.com"
 *                                  _id: "645a06d09d08c598c7c3f49f"
 *          400:
 *              description: Bad Request
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                          example: 
 *                              message: "Provide an appId" 
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
 *              description: Game not found
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                          example:
 *                              message: "Game not found!"
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
 *                              message: "This game is already in favorites!"
 *          500:
 *              description: Internal Server Error
 */
router.post(
    "/",
    verifyToken,
    favoriteGamesController.addToFavoritesHandler
);
/**
 * @openapi
 * '/api/favorite-games':
 *  delete:
 *      tags:
 *      - Favorite Games
 *      summary: Remove a game from favorites
 *      parameters:
 *          - in: query
 *            name: appId
 *            description: Steam appId of the game  
 *            required: true
 *            type: number
 *            example: 730
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
 *                          example:
 *                              message: "The game is removed from favorites"
 *          400:
 *              description: Bad Request
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                          example: 
 *                              message: "Provide an appId"
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
 *              description: Game not found in favorites
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                          example:
 *                              message: "The game is not in favorites!"
 *          500:
 *              description: Internal Server Error
 */
router.delete(
    "/",
    verifyToken,
    favoriteGamesController.removeFromFavoritesHandler
);
/**
 * @openapi
 * '/api/favorite-games':
 *  get:
 *      tags:
 *      - Favorite Games
 *      summary: Get favorite games
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
 *                                  appId:
 *                                      type: number
 *                                  name:
 *                                      type: string
 *                                  header_image:
 *                                      type: string
 *                                  email:
 *                                      type: string
 *                                  _id:
 *                                      type: string
 *                              example:
 *                                  appId: 730
 *                                  name: "Counter-Strike: Global Offensive"
 *                                  header_image: "https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg?t=1683566799"
 *                                  email: "omersafakbebek@gmail.com"
 *                                  _id: "645a06d09d08c598c7c3f49f"
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
 *          500:
 *              description: Internal Server Error
 */
router.get(
    "/",
    verifyToken,
    favoriteGamesController.getFavoritesByEmailHandler
);
export default router;
