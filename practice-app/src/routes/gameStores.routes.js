import express from "express";
import gameStoresController from "../controllers/gameStores.controller.js";
import bodyParser from 'body-parser';

const gameStoresRouter = express.Router();

gameStoresRouter.get("/", gameStoresController.getFavoriteGames);
gameStoresRouter.get("/game", gameStoresController.getGameInfo);
gameStoresRouter.post("/add-favorite", bodyParser.json(), gameStoresController.addFavoriteGame);

export default gameStoresRouter;