import express from "express";
import gameStoresController from "../controllers/gameStores.controller.js";
import bodyParser from 'body-parser';

const gameStoresRouter = express.Router();
/**
 * @openapi
 * '/api/gameprices/':
 *  get:
 *      tags:
 *      - Favorite Games
 *      summary: Gets Favorite Games by email.
 *      parameters:
 *          - in: query
 *            name: email
 *            description: Email of the user whose favorite games to be fetched.    
 *            required: true
 *            type: string
 *      responses:
 *          200:
 *              description: Success indicating that the favorite games of the user is returned
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object      
 *                              properties:
 *                                  favoriteGames:
 *                                      type: any[]
 *                              example:
 *                                  email: "melihexample@gmail.com"
 *                                  game_name: "LEGO Batman"
 *                                  game_rating: "80"
 *                                  sale_price: "4.19"
 *                                  retail_price: "19.99"
 *                                  img_url: "https://cdn.fanatical.com/production/product/400x225/105f34ca-7757-47ad-953e-7df7f016741e.jpeg"
 *          404:
 *              description: Email of the user is not provided
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              error:
 *                              type: string
 *                          example:
 *                              error: "Please provide an email."
 *          500:
 *              description: Internal Server Error
 */
gameStoresRouter.get("/", gameStoresController.getFavoriteGames);


/**
 * @openapi
 * '/api/gameprices/game/':
 *  get:
 *      tags:
 *      - Game Info
 *      summary: Gets a Game Info by game name.
 *      parameters:
 *          - in: query
 *            name: gamename
 *            description: Name of the game whose infos to be fetched.    
 *            required: true
 *            type: string
 *      responses:
 *          200:
 *              description: Success indicating that the game info is returned
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              type: object      
 *                              properties:
 *                                  gameInfo:
 *                                      type: any[]
 *                              example:
 *                                  game_name: "LEGO Batman"
 *                                  game_rating: "80"
 *                                  sale_price: "4.19"
 *                                  retail_price: "19.99"
 *                                  img_url: "https://cdn.fanatical.com/production/product/400x225/105f34ca-7757-47ad-953e-7df7f016741e.jpeg"
 *          404:
 *              description: Name of the game is not provided
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              error:
 *                              type: string
 *                          example:
 *                              error: "Please provide an email."
 *          500:
 *              description: Internal Server Error
 */
gameStoresRouter.get("/game", gameStoresController.getGameInfo);


/**
 * @openapi
 * '/api/gameprices/stores/':
 *  get:
 *      tags:
 *      - Game Info
 *      summary: Gets current game stores available in market.
 *      parameters:
 *          - none
 *      responses:
 *          200:
 *              description: Success indicating that the game stores info is returned
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              type: object      
 *                              properties:
 *                                  gameInfo:
 *                                      type: any[]
 *                              example:
 *                                  "storeID": "7"
 *                                  "storeName": "GOG"
 *                                  "isActive": 1
 *                                  "images": {
 *                                      "banner": "/img/stores/banners/6.png"
 *                                      "logo": "/img/stores/logos/6.png"
 *                                      "icon": "/img/stores/icons/6.png"
 *                                   }
 *          404:
 *              description: Strores couldn't fetched.
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              error:
 *                              type: string
 *                          example:
 *                              error: "Error while fetching stores."
 *          500:
 *              description: Internal Server Error
 */
gameStoresRouter.get("/stores", gameStoresController.getGameStores);


/**
 * @openapi
 * '/api/gameprices/add-favorite':
 *  post:
 *      tags:
 *      - Add Favorite Game
 *      summary: Adds the favorite game of the user to the favorite games.
 *      parameters:
 *          - in: query
 *            name: email
 *            description: Email of the user whose game to be added to database    
 *            required: true
 *            type: string
 *          - in: query
 *            name: gameName
 *            required: true
 *            type: string
 *      responses:
 *          200:
 *              description: Success indicating that the game is added to the favorite games.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object   
 *                          properties:
 *                              message:
 *                              type: string
 *                          example:
 *                              message: "Game is added to favorite games."
 *          400:
 *              description: Email of the game name is not provided.
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              error:
 *                              type: string
 *                          example:
 *                              error: "Please provide required fields."
 */
gameStoresRouter.post("/add-favorite", bodyParser.json(), gameStoresController.addFavoriteGame);

export default gameStoresRouter;