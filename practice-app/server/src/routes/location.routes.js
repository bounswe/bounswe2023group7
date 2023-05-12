import express from "express";
import LocationController from '../controllers/location.controller.js';
import verifyToken from "../utils/auth.js";


const locationRouter = express.Router();

/**
 * @openapi
 * '/api/location/history':
 *  get:
 *      tags:
 *      - Location
 *      summary: Get Location History
 *      parameters:
 *          - in: query
 *            name: email
 *            description: Email of the user whose location history to be fetched    
 *            required: true
 *            type: string
 *      responses:
 *          200:
 *              description: Success indicating that the location history of the user is returned
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object      
 *                              properties:
 *                                  locationHistory:
 *                                      type: any[]
 *                              example:
 *                                  email: "e@kizilkaya.com"
 *                                  city: "Istanbul"
 *                                  region: "Istanbul"
 *                                  postalCode: "34050"
 *                                  country: "Turkey"
 *                                  CountryFlag: "🇹🇷"
 *                                  time: "02:47:28"
 *          400:
 *              description: Email of the user is not provided
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              error:
 *                              type: string
 *                          example:
 *                              error: "email is not provided"
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
locationRouter.get(
    "/history",
    verifyToken,
    LocationController.history
);
/**
 * @openapi
 * '/api/location/addLocation':
 *  post:
 *      tags:
 *      - Location
 *      summary: Adds the location of the user to the location history
 *      parameters:
 *          - in: query
 *            name: email
 *            description: Email of the user whose location to be added to corresponding location history    
 *            required: true
 *            type: string
 *          - in: query
 *            name: ip_address
 *            required: true
 *            type: string
 *      responses:
 *          200:
 *              description: Success indicating that the location is added to the location history
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object   
 *                          properties:
 *                              message:
 *                              type: string
 *                          example:
 *                              message: "Location is added to history."
 *          400:
 *              description: Email of the user or ip_address is not provided or location is not found
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              error:
 *                              type: string
 *                          example:
 *                              error: "email is not provided"
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
 */
locationRouter.post(
    "/addLocation",
    verifyToken,
    LocationController.addLocation
);
/**
 * @openapi
 * '/api/location/findLocation':
 *  get:
 *      tags:
 *      - Location
 *      summary: Gets the current location of the user
 *      parameters:
 *          - in: query
 *            name: ip_address
 *            required: true
 *            type: string
 *      responses:
 *          200:
 *              description: Success indicating that the location of the user is found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
  *                          items:
 *                              type: object      
 *                              properties:
 *                                  Location:
 *                                      type: any[]
 *                              example:
 *                                  city: "Istanbul"
 *                                  region: "Istanbul"
 *                                  postalCode: "34050"
 *                                  country: "Turkey"
 *                                  CountryFlag: "🇹🇷"
 *                                  time: "02:47:28"
 *          400:
 *              description: ip_address is not provided
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              error:
 *                              type: string
 *                          example:
 *                              error: "ip address is not provided"
 */
locationRouter.get(
    "/findLocation",
    LocationController.findLocation
)

export default locationRouter