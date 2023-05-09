import axios from "axios";
import { addToFavorites, getFavoritesByEmail, removeFromFavorites } from "../models/favorites.model.js";
const searchApiUrl = "https://steamcommunity.com/actions/SearchApps/";
const getDetailApiUrl = "https://store.steampowered.com/api/appdetails?appids=";
const FavoriteGamesController = {
    searchGamesHandler: async function (req, res) {
        try {
            const searchValue = req.query.searchValue;
            if (!searchValue) {
                return res.status(400).send({message: "Provide a search value!"});
            }
            const url = `${searchApiUrl}${searchValue}`;
            const response = await axios.get(url);
            if (response.status == 200) {
                if (response.data.length == 0) {
                    return res.status(404).json({error: "No game found!"});
                } 
                return res.send(response.data);
            }
        } catch (e) {
            return res.status(500).send(e);
        }
    },
    addToFavoritesHandler: async function (req, res) {
        try {
            const email = req.query.email;
            const appId = req.query.appId;
            // const language = req.query.l;    
            if (!email) {
                return res.status(400).send({message: "Provide an email"});
            }
            if (!appId) {
                return res.status(400).send({message: "Provide an appId"});
            }
            var url = `${getDetailApiUrl}${appId}`;
            // if (language) {
            //     url = url.concat(`&l=${language}`);
            // }
            console.log(url);
            const response = await axios.get(url);
            if (response.status==200) {
                if (!response.data[appId].success) {
                    return res.status(404).send({message: "Game not found!"});
                }
                const game = response.data[appId].data; 
                const created = await addToFavorites({
                    appId: game.steam_appid,
                    header_image: game.header_image,
                    name: game.name,
                    email: email
                });
                return res.send( {message: "The game is added to the favorites", created: created});
            }
        } catch (e) {
            if (e.code == 11000) {
                return res.status(409).send({message: "This game is already in favorites!"});
            }
            console.log(e);
            return res.status(500).send(e);
        }
    },
    removeFromFavoritesHandler: async function (req, res) {
       try {
            const email = req.query.email;
            const appId = req.query.appId;
            if (!email) {
                return res.status(400).send({message: "Provide an email"});
            }
            if (!appId) {
                return res.status(400).send({message: "Provide an appId"});
            }
            const deleteResult = await removeFromFavorites(appId, email);
            if (deleteResult.acknowledged && deleteResult.deletedCount==0) {
                return res.status(404).send({message: "The game is not in favorites!"});
            }
            return res.status(200).send({message: "The game is removed from favorites"});
       } catch (e) {
            return res.status(500).send(e);
        } 
    },
    getFavoritesByEmailHandler: async function (req, res) {
        try {
            const email = req.query.email;
            if (!email) {
                return res.status(400).send({message: "Provide an email"});
            }
            const favorites = await getFavoritesByEmail(email);
            return res.send(favorites);
        } catch (e) {
            return res.status(500).send(e);
        }
    }
}
export default FavoriteGamesController;