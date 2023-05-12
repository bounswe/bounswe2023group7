import express from "express";
import gameStoresController from "../controllers/gameStores.controller.js";
import verifyToken from "../utils/auth.js";

const gameStoresRouter = express.Router();

/**
 * @openapi
 * '/api/gameprices/':
 *  get:
 *      tags:
 *      - Games Cart
 *      summary: Gets Games from Cart by email.
 *      parameters:
 *          - in: query
 *            name: email
 *            description: Email of the user whose games to be fetched.    
 *            required: true
 *            type: string
 *      responses:
 *          200:
 *              description: Success indicating that the games of the user is returned
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                          example:
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
gameStoresRouter.get("/", verifyToken, gameStoresController.getGamesCart);


/**
 * @openapi
 * '/api/gameprices/game':
 *  get:
 *      tags:
 *      - Game Info
 *      summary: Gets game information.
 *      parameters:
 *          - in: query
 *            name: game name
 *            description: name of the game whose info to be fetched.    
 *            required: true
 *            type: string
 *      responses:
 *          200:
 *              description: Success indicating that the game info is fetched
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                                  game_name: "LEGO Batman"
 *                                  game_rating: "80"
 *                                  sale_price: "4.19"
 *                                  retail_price: "19.99"
 *                                  img_url: "https://cdn.fanatical.com/production/product/400x225/105f34ca-7757-47ad-953e-7df7f016741e.jpeg"
 *          404:
 *              description: Game name is not provided
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              error:
 *                              type: string
 *                          example:
 *                              error: "Please provide a game name."
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
 *                          type: array
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
 *                                      "banner": "/img/stores/banners/6.png",
 *                                      "logo": "/img/stores/logos/6.png",
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
 * '/api/gameprices/add-cart':
 *  post:
 *      tags:
 *      - Add Game to Cart
 *      summary: Adds the game of the user to the games cart.
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
 *              description: Success indicating that the game is added to the games cart.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object   
 *                          properties:
 *                              message:
 *                              type: string
 *                          example:
 *                              message: "Game is added to games cart."
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
gameStoresRouter.post("/add-cart",verifyToken, gameStoresController.addGametoCart);

export default gameStoresRouter;