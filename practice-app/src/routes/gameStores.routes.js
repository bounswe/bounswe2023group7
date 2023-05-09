import express from "express";
import gameStoresController from "../controllers/gameStores.controller.js";

const gameStoresRouter = express.Router();

gameStoresRouter.get("/", gameStoresController.getFavoriteGames);
gameStoresRouter.get("/game", gameStoresController.getGameInfo);

export default gameStoresRouter;