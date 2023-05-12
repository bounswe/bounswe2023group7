import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    eventName: 
    {
        type : String,
        required : true
    },
    eventTime: 
    {
        type : String,
        required : true
    },
    eventLocationLatitude:
    {
        type : Number,
        required : true,
        default : 0.00
    },
    eventLocationLongitude:
    {
        type : Number,
        required : true,
        default : 0.00
    }
        
});
const Event = mongoose.model('Event', EventSchema);

export default Event;