import axios from "axios";
import {Platform, getUsersPlatforms, addMyPlatform} from "../models/game-platform.model.js";
const gamePlatformController = {
    searchGame: async function (req, res) {
        const baseUrl = "https://api.mobygames.com/v1/games?limit=10&format=brief&title=";
        try {
            const title=req.query.title;
            if (!title) {
                return res.status(400).json({message: "You should not give an empty input."});
            }
            const lastTitle = title.replace(/ /g, "%20");
            const url = `${baseUrl}${lastTitle}&api_key=${process.env.MOBY_API_KEY}`;
            const response = await axios.get(url);
            if (response.status == 200) {
                if (response.data.games.length == 0) {
                    return res.status(404).json({error: "Game not found", message: "You should use right keywords."});
                } 
                return res.send(response.data);
            }
        }
        catch (err) {
            // Handle error
            const status=err.response.status
            if (status==422) {
                return res.status(422).json({error: "Title is too long", message: "Title filter must be <= 128 characters."})
            }
            if (status==429) {
                return res.status(429).json({error: "Too many requests", message: "You should be patient"})
            }
            else if (status==500) {
                return res.status(500).send(err);
            }
            
        }

    },
    getPlatforms: async function (req, res) {
        const baseUrl = "https://api.mobygames.com/v1/games?format=normal&id=";
        try {
            const id=req.query.id;
            if (!id) {
                return res.status(404).json({error: "Game not found", message: "You should use right keywords."});
            }
            const url = `${baseUrl}${id}&api_key=${process.env.MOBY_API_KEY}`;
            const response = await axios.get(url);
            if (response.status == 200) {
                if (response.data.games.length == 0) {
                    return res.status(404).json({error: "Game not found", message: "You should use right keywords."});
                } 
                const list=await getUsersPlatforms(req.username);
                const platformList=[];
                for (let i=0; i<list.length; i++) {
                    platformList.push(list[i].platformName);
                }
                for (let i = 0; i < response.data.games[0].platforms.length; i++) {
                    if (platformList.includes(response.data.games[0].platforms[i].platform_name)) {
                        return res.send({platforms: response.data.games[0].platforms, message: "To play this game you can use these platform: "+response.data.games[0].platforms[i].platform_name+"."});
                    }
                }
                return res.send({platforms: response.data.games[0].platforms, message: "You do not have these platforms."});
               
                
            }
        }
        catch (err) {
            // Handle error
            const status=err.response.status
            if (status==400) {
                return res.status(404).json({error: "Game not found", message: "You should use right keywords."})
            }
            else if (status==429) {
                return res.status(429).json({error: "Too many requests", message: "You should be patient"})
            }
            else if (status==500) {
                return res.status(500).send(err);
            }
            
        }
    },
    postMyPlatform: async function (req, res) {
        const baseUrl = "https://api.mobygames.com/v1/platforms";
        try {
            const title=req.query.title;
            if (!title) {
                return res.status(400).json({message: "You should not give an empty input."});
            }
            const url = `${baseUrl}?api_key=${process.env.MOBY_API_KEY}`;
            const response = await axios.get(url);
            const platforms = response.data.platforms

            for (let i = 0; i < platforms.length; i++) {
                if (title==platforms[i].platform_name.toLowerCase()) {
                    const list=await getUsersPlatforms(req.username);
                    const platformList=[];
                    for (let j=0; j<list.length; j++) {
                        platformList.push(list[j].platformName);
                    }
                    if (platformList.includes(platforms[i].platform_name)) {
                        return res.status(409).send({message: "You have already added this platform"});
                    }
                    
                    await addMyPlatform(
                        platforms[i].platform_id.toString(),
                        platforms[i].platform_name,
                        req.username
                        );
                    return res.status(200).send({message: "Your submission is successful."});
                }
            }
            return res.status(404).json({error: "Platform not found", message: "You should use right keywords."});
        }
        catch {
            return res.status(500).send(err);
        }
        
        
        
    
    
    }

    
}
export default gamePlatformController;

