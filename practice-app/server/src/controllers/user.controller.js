import {addUser, getUserByUsernameOrEmail} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
const UserController = {
  signupHandler: async function (req, res) {
    try {
      const body = req.body;
      if (!body.email) {
        return res.status(400).send({message: "Provide a valid email!"});
      }
      if (!body.username) {
        return res.status(400).send({message: "Provide a username!"});
      }
      if (!body.password || body.password.length<8) {
        return res.status(400).send({message: "Provide password with at least 8 characters!"});
      }      
      body.password = await bcrypt.hash(body.password, 10);
      await addUser(body);
      return res.send({message: "Signup is successful"});
    } catch(e) {
      if (e.code == 11000) {
        if (e.keyValue.username) {
          return res.status(409).send({message: "This username is taken!"});
        } else if (e.keyValue.email) {
          return res.status(409).send({message: "This email is already in use!"});
        }
      }
      return res.status(500).send(e);
    }
  },
  loginHandler: async function (req, res) {
    try {
      const body = req.body;
      if (!body.identifier) {
        return res.status(400).send({message: "Provide a username or email!"});
      }
      if (!body.password || body.password.length<8) {
        return res.status(400).send({message: "Provide a password with at least 8 characters!"});
      } 
      const user = await getUserByUsernameOrEmail(body.identifier);
      if (!(user&& await bcrypt.compare(body.password, user.password))) {
        return res.status(403).send({message: 'Bad Credentials'});
      }
      const accesToken = jwt.sign({username: user.username}, process.env.SECRET_KEY);
      return res.send({message: "Login is successful", accessToken: accesToken});
    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  }
};

export default UserController;
