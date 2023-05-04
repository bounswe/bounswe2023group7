import express from "express";
const router = express.Router();
router.get('/', (_, res) => {
    return res.status(200).send("Welcome to the practice app!");
});

export default router;