import axios from "axios";
import { addToHistory, getHistoryByEmail } from "../models/randomGame.models.js"

async function isThatAGame (appId) {
    const baseUrl = `https://store.steampowered.com/api/appdetails?appids=${appId}`;

    try {
        var response = await axios.get(baseUrl);
        var isItAGame = response.data[appId].data.type === 'game';
        return isItAGame;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function getRandomGame() {
    try {
        const baseUrl = "https://api.steampowered.com/ISteamApps/GetAppList/v2/";
        const response = await axios.get(baseUrl);
        var apps = response.data.applist.apps;
        var app = apps[Math.floor(Math.random() * apps.length)];
        return app;
    } catch (error) {
        console.error(error);
        return null;
    }
}
async function randomGameHandler (req, res) {
    try {
        var isItAGame = false;
        let appId;
        do {
            var app = await getRandomGame();
            appId = app["appid"];
            isItAGame = await isThatAGame(appId);
        } while (!isItAGame);
        var gameDatas = await getGameInformation(appId);
        const history = await addToHistory({
            appId: appId,
            name: gameDatas.name,
            shortDescription: gameDatas.short_description,
            headerImage: gameDatas.header_image,
            email: req.email
            });
        return res.status(200).json({ 
            name: gameDatas.name, 
            short_description: gameDatas.short_description, 
            image: gameDatas.header_image
        } );
    } catch (error) {
        console.error(error);
        return res.status(500).send('Oops! Something went wrong');
    }
}   

async function getGameInformation (appId) {
    console.log(appId);
    const baseUrl = `https://store.steampowered.com/api/appdetails?appids=${appId}`;
    var response = await axios.get(baseUrl);
    return response.data[appId].data;
}

async function addToGameHistoryHandler (req, res){
    try {
        const email = req.email;
        const appId = req.query;
        if (!email) {
            return res.status(400).send({message: "Provide an email"});
        }
        if (!appId) {
            return res.status(400).send({message: "Provide an appId"});
        }
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function getHistoryByEmailHandler (req, res){
    try {
        const email = req.email;
        if(!email){
            return res.status(400).send({message: "Provide an email"})
        }
        const randomGameHistory = await getHistoryByEmail(email);
        return res.send(randomGameHistory);
    } catch (error) {
        res.status(500).send(error);
    }
}

const RandomGameController = {
    isThatAGame,
    getRandomGame,
    getGameInformation,
    randomGameHandler,
    addToGameHistoryHandler,
    getHistoryByEmailHandler
}

export default RandomGameController;