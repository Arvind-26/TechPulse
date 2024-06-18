const mongoose = require('mongoose')

const upSchema = new mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    username: { type: String },
    email: { type: String },
    address: { type: String },
    password: { type: String }
})
mongoose.models = {}
export default mongoose.model("up", upSchema)