const mongoose = require('mongoose')

const OfferSchema = new mongoose.Schema({
    img : {type:String}
})
mongoose.models = {}
export default mongoose.model("offer" , OfferSchema)