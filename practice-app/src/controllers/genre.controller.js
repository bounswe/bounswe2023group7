import axios from "axios";

//import Game from '../models/genre';

async function GenreList(req,res) {
    try {
        const baseUrl = "https://api.rawg.io/api/genres?key=c1826894471749129f3278eea6d8787f";
        const response = await axios.get(baseUrl);
        var results = response.data.results;
        const genres = results.map((genre) => {
            const{
                name,
                games_count,
            } = genre;
            return {
                "genre-name": name,
                "count":games_count
              }
        })
        return res.send(genres)
    } catch (error) {
        console.error(error);
        return null;
    }
} 

const Genre = {
    GenreList
}

export default Genre;