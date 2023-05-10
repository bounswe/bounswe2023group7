import mongoose from 'mongoose';
import validator from "validator";


const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate:[validator.isEmail,'Provide a valid email adress']
    },
});


export const User = mongoose.model('Users',UserSchema);

export async function addUser(model) {
  return await User.create(model);
}

export async function getUserByEmail(email) {
  return await User.findOne( {email: email} );
}
export async function getUserByUsername(username) {
  return await User.findOne( {username: username});
}

export async function getUserByUsernameOrEmail(value) {
  return await User.findOne({ $or: [{email: value}, {username: value}]});
}