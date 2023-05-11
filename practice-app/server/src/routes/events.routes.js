import express from "express";
import EventController from "../controllers/events.controller.js";

const eventRouter = express.Router();

/**
 * @openapi
 * '/api/events/list':
 * get:
 *      tags:
 *      - Created events
 *      summary: Get the list of events created so far
 *      parameters:
 * 
 *      responses:
 *           '200': 
 *              description: Success indicating that the list of created events is returned
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  schema:
 *                                      $ref: '#/components/schemas/Event'
 *                              example:
 *                                  eventDate: "2023-06-10"
 *                                  eventName: "Tasoda Fest"                                  
 *                                  eventTime: "23:35:20"
 *                                  eventLocationLatitude: "11.1530492"
 *                                  eventLocationLongitude: "37.8449865"
 *           '500':
 *                  description: Internal Server Error
 */
eventRouter.get(
    "/list",
    EventController.ListEvent
);

/**
 * @openapi
 * '/api/events/createEvent':
 * post:
 *      tags:
 *      - Create Event
 *      summary: Creates a new event with given parameters while given address value converted to coordinate values.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          eventName:
 *                              type: string
 *                              required: true
 *                              example: "Tasoda Fest"
 *                          eventDate:
 *                              type: date
 *                              example: "2023-06-10"
 *                          eventTime:
 *                              type: string
 *                              required: true
 *                              example: "19.30"
 *                          eventLocation:
 *                              type: string
 *                              required: true
 *                              example: "Bogazici University South Campus"
 *      responses:
 *           '200':
 *              description: Success indicating the location is added to the location history
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "Event is successfully created."
 * 
 *           '400':
 *              description: event name or location is not provided in correct format or corresponding coordinate values for location is not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  example: "event name is not provided"
 *           '500':
 *                  description: Internal Server Error
 */
eventRouter.post("/createEvent", EventController.CreateEvent);


export default eventRouter
