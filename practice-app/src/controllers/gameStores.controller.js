import axios from "axios";
import FavoriteGames from "../models/favoriteGames.model.js";

const baseURL = "https://www.cheapshark.com/api/1.0/";
class GameStoresController {
    async getGameStores(req, res) {

        const storesURL = baseURL + "stores";
        const response = await axios.get(storesURL);
        res.status(200).send(response.data);

    }


    async getGameInfo(req, res) {

        const gameName = req.query.name;

        console.log("this is the query game name " + gameName);

        if(!gameName){
            return res.status(400).json({ message: "Plesae provide the required fields."});
        }

        const priceURL = baseURL + `games?title=${gameName}&limit=1`;
        const [resp] = (await axios.get(priceURL)).data;

        if(!resp){
            return res.status(400).json({ message: "Game not found."});
        }

        const dealID = resp.cheapestDealID;

        const gameInfoURL = baseURL + `deals?id=${dealID}`;

        const response = (await axios.get(gameInfoURL)).data;

        res.status(200).send(response);
    }

    async getFavoriteGames(req, res) {

        const email = req.query.email;

        if(!email){
            return res.status(400).json({ message: "Please provide an email."});
        }

        const favoriteGames = await FavoriteGames.find({ email: email });

        res.status(200).json(favoriteGames);

    }

    async addFavoriteGames(req, res) {

        const email = req.query.email;

        if(!email){
            return res.status(400).json({ message: "Please provide an email."});
        }

        const favoriteGames = await FavoriteGames.find({ email: email });

        res.status(200).json(favoriteGames);

    }


}

const gameStoresController = new GameStoresController();

export default gameStoresController;