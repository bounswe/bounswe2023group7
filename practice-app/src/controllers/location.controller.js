import axios from "axios";
import LocationModel from '../models/location.model.js';


const LocationController = {

    history: async function (req, res) {
        try {
            const email = req.query.email
            if(!email){
                return res.status(404).json({ message: "email is not provided"})
            }
            const locationHistory = await LocationModel.getLocationHistory(email);
            res.status(200).json({
                locationHistory: locationHistory
            })

        } catch (error) {
            return res.status(500).json({message: error.message}) // email is not specified or no such history
        }
    },


    addLocation: async function (req, res) {
        try {
            const email = req.query.email
            if(!email){
                return res.status(400).json({ message: "email is not provided"})
            }
            if(!req.query.ip_address){
                return res.status(400).json({ message: "ip address is not provided"})
            }
            
            const url = `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.LOCATION_TOKEN}&ip_address=${req.query.ip_address}`
            const response = (await axios.get(url)).data;
            //console.log(response);
            await LocationModel.addLocation( 
                email, 
                response.city, 
                response.region, 
                response.postal_code, 
                response.country, 
                response.flag['emoji'], 
                response.timezone['current_time']
            );
            
            res.status(200).json({
                message: "Location is added to history."
            });

        } catch (error) {

            console.log(error);
            res.status(400).json({ message: "location not found" })
            
        }
    },


    findLocation: async function(req, res) {
        try {
            if(!req.query.ip_address){
                return res.status(400).json({ message: "ip address is not provided"})
            }
            const url = `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.LOCATION_TOKEN}&ip_address=${req.query.ip_address}`
            const response = (await axios.get(url)).data;
            return res.status(200).json({
                city: response.city, 
                region: response.region, 
                postal_code: response.postal_code, 
                country: response.country, 
                country_flag: response.flag['emoji'], 
                time: response.timezone['current_time']
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: error.message})  
        }
        
    }





};

export default LocationController