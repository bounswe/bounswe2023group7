import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { getUserByUsername } from "../models/user.model.js";
config();



const verifyToken = async (req,res,next) =>{
    const token = (req.headers.authorization || "").replace(
      /^Bearer\s/,
      ""
    );
    if(!token) return res.status(401).send({message: 'Provide an access token'});
    try{
        const username = jwt.verify(token,process.env.SECRET_KEY).username;
        const user = await getUserByUsername(username);
        if (!user) {
          return res.status(404).send({message: "User not found!"});
        }
        req.username = username;
        req.user = user;
        req.email = user.email;
        next();
    }catch(err){
      console.log(err);
      if (err.name && err.name == "JsonWebTokenError") {
        return res.status(401).send({message: "Invalid token!"});
      }
      return res.status(500).send(err);
    }
}

export default verifyToken;