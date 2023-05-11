import express from "express";
import Genre from "../controllers/genre.controller.js";

const genreRouter = express.Router();


genreRouter.get(
    "/genre",
    Genre.GenreList
);
genreRouter.post(
    "/genre",
    Genre.addGenre
);
genreRouter.get(
    "/genreDb",
    Genre.GenreListfromDb
)

export default genreRouter;