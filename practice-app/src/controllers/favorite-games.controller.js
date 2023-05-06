import axios from "axios";
const searchApiUrl = "https://steamcommunity.com/actions/SearchApps/";
const FavoriteGamesController = {
    searchGamesHandler: async function (req, res) {
        try {
            const searchValue = req.query.searchValue;
            if (!searchValue) {
                res.status(400).send("Provide a search value!");
            }
            const url = `${searchApiUrl}${searchValue}`;
            const response = await axios.get(url);
            if (response.status == 200) {
                if (response.data.length == 0) {
                    return res.status(404).json({error: "No game found!"});
                } 
                return res.send(response.data);
            } else {
                return res.status(response.status).send(response.statusText);
            }
        } catch (e) {
            return res.status(500).send(e);
        }
    }
}
export default FavoriteGamesController;