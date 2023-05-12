import axios from "axios";
import EventModel from "../models/event.model.js";


const EventController = {
    
    ListEvent : async function(req, res){
        try{
            const response = await EventModel.find({}).select('-_id -__v -eventDate');
                return res.status(200).json(response);
        }
        catch(error){
            return res.status(500).json({ message : error.message })
        }
    },

    CreateEvent : async function(req, res){
        try{
            const address = req.body.eventLocation;
            if(address.length == 0){
                console.log("address is not provided")
                return res.status(400).json({ message : "address is not provided" })
            }
            if(req.body.eventName.length == 0){
                console.log("event name is not provided")
                return res.status(400).json({ message : "event name is not provided"})
            }
            if(req.body.length == 0){
                console.log("body is not provided")
                return res.status(400).json({ message : "body is not provided" })
            }
            /*
            var day = req.body.eventDateDay;
            var month = req.body.eventDateMonth;
            var year = req.body.eventDateYear;

            var d = `${day}-${month}-${year}`;
            var date = new Date(d);
            if( isNaN(date.getTime())){
                console.log("date is not provided in correct format :")

                return res.status(400).json( { message : "date is not provided in correct format"})
            }
*/
            const timeRegex = /^([01]\d|2[0-3])[:.]([0-5]\d)$/;
            if(!timeRegex.test(req.body.eventTime)){
                console.log("time is not provided in a correct format")
                return res.status(400).json( { message : "time is not provided in a correct format" } )
            }
            var isError;
            await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params:{
                    address: address,
                    key: process.env.GEOCODING_TOKEN
                }
            }).then(function(response){
                // console.log(response.data.results[0]);
                const event = new EventModel({ 
                    eventName: req.body.eventName, 
                    eventTime: req.body.eventTime,
                    eventLocationLatitude: response.data.results[0].geometry.location.lat,
                    eventLocationLongitude: response.data.results[0].geometry.location.lng});
                event.save().then(() => console.log(event));
            })
                .catch(function(error){
                    isError = true;
                });
            if (isError) {
                return res.status(400).send("Bad location");
            }
           return res.status(200).send("Event is successfully created.");
        }
        catch(error){
            return res.status(500).send({ error : error.message })
        }
    }
};

export default EventController;
