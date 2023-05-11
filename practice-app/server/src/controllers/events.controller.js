import axios from "axios";
import EventModel from "../models/event.model.js";


const EventController = {
    
    ListEvent : async function(req, res){
        try{
            const response = await EventModel.find({}).select('-_id -__v');
            if (response.length == 0){
                res.status(200).send("There is no event to show.");
            }
            else{
                res.status(200).json(response);
            }
        }
        catch(error){
            res.status(500).json({ message : error.message })
        }
    },

    CreateEvent : async function(req, res){
        try{
            const address = req.body.eventLocation;

            if(address.length == 0){
                return res.status(400).json({ message : "address is not provided" })
            }
            if(req.body.eventName.length == 0){
                return res.status(400).json({ message : "event name is not provided"})
            }
            if(req.body.length == 0){
                return res.status(400).json({ message : "body is not provided" })
            }

            var d = `${req.body.eventDate.year}-${req.body.eventDate.month}-${req.body.eventDate.day}`;
            var date = new Date(d);
            if( isNaN(date.getTime())){
                return res.status(400).json( { message : "date is not provided in correct format"})
            }

            const timeRegex = /^([01]\d|2[0-3])[:.]([0-5]\d)$/;
            if(!timeRegex.test(req.body.eventTime)){
                return res.status(400).json( { message : "time is not provided in a correct format" } )
            }

            await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params:{
                    address: address,
                    key: process.env.GEOCODING_TOKEN
                }
            }).then(function(response){

                const event = new EventModel({ 
                    eventName: req.body.eventName, 
                    eventDate:{ year: req.body.eventDate.year,
                                month: req.body.eventDate.month,
                                day: req.body.eventDate.day},
                    eventTime: req.body.eventTime,
                    eventLocationLatitude: response.data.results[0].geometry.location.lat,
                    eventLocationLongitude: response.data.results[0].geometry.location.lng});
                
                event.save().then(() => console.log(event));
            
            })
                .catch(function(error){
                    console.log(error)
                });
                
            res.status(200).send("Event is successfully created.");
        }
        catch(error){
            res.status(500).send({ error : error.message })
        }
    }
};

export default EventController;
