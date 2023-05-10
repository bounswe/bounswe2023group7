import express from "express";
const router = express.Router();
import Genre from "../controllers/genre.controller.js";

router.get(
    "/",
    Genre.GenreList
);

export default router;