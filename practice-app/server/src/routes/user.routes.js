import userController from "../controllers/user.controller.js";
import express from "express";
const router = express.Router();

/**
 * @openapi
 * '/api/users/signup':
 *  post:
 *    tags:
 *    - User
 *    summary: Signup route
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *              username:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *              example:
 *                message: "Provide a username!"
 *      409:
 *        description: Conflict
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *              example:
 *                message: "This username is taken!"
 *      500:
 *        description: Internal Server Error    
 */
router.post(
  "/signup", 
  userController.signupHandler
);
/**
 * @openapi
 * '/api/users/login':
 *  post:
 *    tags:
 *    - User
 *    summary: Login route
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              identifier:
 *                type: string
 *                description: username or email
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *              example:
 *                message: "Provide a username or email!"
 *      403:
 *        description: Forbidden
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *              example:
 *                message: "Bad Credentials"
 *      500:
 *        description: Internal Server Error    
 */
router.post(
  "/login",
  userController.loginHandler
);

export default router;
