import express from "express";
import Genre from "../controllers/genre.controller.js";
import cors  from "cors";
const genreRouter = express.Router();

genreRouter.use(cors());

/**
 * @openapi
 * '/api/genre':
 *  get:
 *      tags:
 *      - Genres
 *      summary: Get genre and count of games
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
 *                                  genre-name:
 *                                      type: string
 *                                  count:
 *                                      type: string
 *                              example:
 *                                  genre-name: "Indie"
 *                                  count: "52514"
 *                                  
 *          500:
 *              description: Internal Server Error
 */
genreRouter.get(
    "/genre",
    Genre.GenreList
);

/**
 * @openapi
 * '/api/genre':
 *  post:
 *      tags:
 *      - Genres
 *      summary: Add a genre and game counts to the database
 *      parameters:
 *          - in: query
 *            email: email
 *            description: Email is required but is not unique 
 *            required: true
 *            type: string
 *            example: "fatmasenaalci@gmail.com"
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              created:
 *                                  type: object
 *                                  properties:
 *                                      email:
 *                                          type: string
 *                                      genre-name:
 *                                          type: string
 *                                      count:
 *                                          type: string
 *                                      
 *                          example:
 *                              created:
 *                                  email: "fatmasenaalci@gmail.com"
 *                                  genre-name: "Action"
 *                                  count: "172448"
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
 *                              message: "These are already in the database"
 *          500:
 *              description: Internal Server Error
 */
genreRouter.post(
    "/genre",
    Genre.addGenre
);


/**
 * @openapi
 * '/api/genreDb':
 *  get:
 *      tags:
 *      - Genres
 *      summary: Get genre and count of games from database
 *      parameters:
 *          - in: query
 *            email: email
 *            description: Email is required but is not unique   
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
 *                                  genre-name:
 *                                      type: string
 *                                  count:
 *                                      type: string
 *                              example:
 *                                  email: "fatmasenaalci@gmail.com"
 *                                  genre-name: "Action"
 *                                  count: "172448"
 *                                  _id: "645e3a318b60a720e1d9ef99"
 *          304:
 *              description: No Changing
 *                                  
 *          500:
 *              description: Internal Server Error
 */
genreRouter.get(
    "/genreDb",
    Genre.GenreListfromDb
)

export default genreRouter;