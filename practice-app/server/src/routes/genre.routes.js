import express from "express";
import Genre from "../controllers/genre.controller.js";
import cors  from "cors";
const genreRouter = express.Router();

genreRouter.use(cors());

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