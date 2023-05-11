import axios from "axios";
import Genres from '../models/genre.model.js';

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
async function addGenre(req, res) {
    const baseUrl = "https://api.rawg.io/api/genres?key=c1826894471749129f3278eea6d8787f";

    const email = req.body.email;

    if(!email){
        return res.status(400).json({ message: "Plesae provide the required fields."});
    }


    const response = (await axios.get(baseUrl)).data.results;
    const genres = response.map((genre) => {
        const{
            name,
            games_count,
        } = genre;
        return {
            "email":email,
            "genre": name,
            "game_count":games_count
          }
    })

    await Genres.insertMany(genres);
    res.status(201).send(genres);

}
async function GenreListfromDb(req,res) {
    try {
        const email = req.query.email;
        var results = await Genres.find({email:email});
        return res.send(results)
    } catch (error) {
        console.error(error);
        return null;
    }
} 
const Genre = {
    GenreList,
    addGenre,
    GenreListfromDb
}

export default Genre;