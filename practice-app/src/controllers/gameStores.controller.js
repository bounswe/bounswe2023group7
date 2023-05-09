import axios from "axios";
import GameStores from "../models/gameStores.model.js";

const baseURL = "https://www.cheapshark.com/api/1.0/";
class GameStoresController {
    async getGameStores(req, res) {

        const storesURL = baseURL + "stores";
        const response = await axios.get(storesURL);
        res.send(response.data);

    }

    async getCheapestPrice(req, res) {

        const gameName = req.query.name;
        const gameLimit = req.query.limit;

        if(!gameName || !gameLimit){
            return res.status(400).json({ message: "Plesae provide the required fields."});
        }
        console.log(req.query);
        console.log(req.params);
        const priceURL = baseURL + `games?title=${gameName}&limit=${gameLimit}`;

        const response = await axios.get(priceURL);

        res.send(response.data);

    }
}

const gameStoresController = new GameStoresController();

export default gameStoresController;