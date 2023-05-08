import express from "express";
const router = express.Router();
import favoriteGamesController from "../controllers/favorite-games.controller.js";
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
 *                                  appid: "730"
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

router.post(
    "/",
    favoriteGamesController.addToFavoritesHandler
);

router.delete(
    "/",
    favoriteGamesController.removeFromFavoritesHandler
);
router.get(
    "/",
    favoriteGamesController.getFavoritesByEmailHandler
);
export default router;
