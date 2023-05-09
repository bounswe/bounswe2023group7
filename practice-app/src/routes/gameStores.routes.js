import express from "express";
import gameStoresController from "../controllers/gameStores.controller.js";

const gameStoresRouter = express.Router();

gameStoresRouter.get("/", gameStoresController.getGameStores);
gameStoresRouter.get("/prices", gameStoresController.getCheapestPrice);

export default gameStoresRouter;