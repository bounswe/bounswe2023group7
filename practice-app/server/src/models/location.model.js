import mongoose from 'mongoose'

const LocationSchema = new mongoose.Schema({
    email: { //user has several location data, so it is not unique
        type: String,
        required: true,
        unique: false
    },

    city: {
        type: String,
        default: "Nowhere"
    },
    region: {
        type: String,
        default: "Nowhere"
    },
    postalCode: {
        type: String,
        default: "00000" 
    },
    country: {
        type: String,
        default: "Nowhere"
    },
    countryFlag: {
        type: String,
    },
    time: {
        type: String
    }
})

const Location = mongoose.model('Location', LocationSchema);

const getLocationHistory = async (email) => {
    return await Location.find( { email: email });
}

const addLocation = async(
    email, 
    city, 
    region, 
    postalCode, 
    country, 
    countryFlag, 
    time) => {

        const location = new Location({
            email: email, 
            city: city, 
            region: region, 
            postalCode: postalCode, 
            country: country, 
            countryFlag: countryFlag,
            time: time });

            location.save()
}

export default { Location, getLocationHistory, addLocation };