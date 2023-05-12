// controllers/streamingGamesController.js
import Game from '../models/streaming-game.model.js';
import axios from 'axios';

const TWITCH_API_CLIENT_ID = 'wbmzp6h6688riuedz47eezgn1fktgr';
const TWITCH_API_TOKEN = 'x6c56s3fpxfgmfzfw144i34297li2k';

const streamingGamesController = {
  // En çok izlenen oyunu getirir 
  async getMostViewedGame(req, res) {
    const { count } = req.params;
    try {
        const response = await axios.get(`https://api.twitch.tv/helix/games/top?first=10`, {
          headers: {
            'Client-ID': TWITCH_API_CLIENT_ID,
            'Authorization': `Bearer ${TWITCH_API_TOKEN}`
          }
        });
        
        const { name, id } = response.data.data[1];
        res.status(200).json({ name, id });

    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: 'Could not retrieve most viewed game' });
    }
  },

  // En çok izlenen oyunu kaydeder
  async saveMostViewedGame(req, res) {
    try {
        const response = await axios.get(`https://api.twitch.tv/helix/games/top?first=10`, {
          headers: {
            'Client-ID': TWITCH_API_CLIENT_ID,
            'Authorization': `Bearer ${TWITCH_API_TOKEN}`
          }
        });
  
        const { name, id } = response.data.data[1];
        const date = new Date();
        date.setHours(date.getHours() + 3); 
        console.log(date);
        const game = new Game({ name, id, date });
        console.log(game);
        await game.save();

        res.status(201).json(game);

    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Could not retrieve most viewed game' });
    }
  },

  // Kaydedilen en çok izlenen oyunları getirir
  async getSavedGames(req, res) {
    try {
      const games = await Game.find().select('name id date');
      res.status(200).json(games);

    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
      }
  }
};

export default streamingGamesController;
