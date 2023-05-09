import axios from "axios";
import GameStores from "../models/gameStores.model.js";

const baseURL = "https://www.cheapshark.com/api/1.0/";
class GameStoresController {
    async getGameStores(req, res) {

        const storesURL = baseURL + "stores";
        const response = await axios.get(storesURL);
        res.send(response.data);

    }


    async getGameInfo(req, res) {

        const gameName = req.query.name;

        console.log("this is the query game name " + gameName);

        if(!gameName){
            return res.status(400).json({ message: "Plesae provide the required fields."});
        }

        const priceURL = baseURL + `games?title=${gameName}&limit=1`;
        const [resp] = (await axios.get(priceURL)).data;
        const dealID = resp.cheapestDealID;

        const gameInfoURL = baseURL + `deals?id=${dealID}`;

        const response = (await axios.get(gameInfoURL)).data;

        res.send(response);
    }

}

const gameStoresController = new GameStoresController();

export default gameStoresController;