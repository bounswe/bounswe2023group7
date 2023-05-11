import axios from "axios";
import Genre from '../models/genre.model';

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

    const email = req.body.email;

    if(!email){
        return res.status(400).json({ message: "Plesae provide the required fields."});
    }


    const response = (await axios.get(baseUrl)).data;
    

    const shortResponse = {
        "email" : email,
        "genre": response.results.genre-name,
        "game_count": response.results.count,
    }

    const Genre = new Genre(shortResponse);
    Genre.save();

    res.status(201).send(shortResponse);

}
const Genre = {
    GenreList,
    addGenre
}

export default Genre;