const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    name: { type: String, required: true },
    photo: { type: String, required: true },
    price: { type: String, required: true }
});

const upSchema = new mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    username: { type: String },
    email: { type: String },
    address: { type: String },
    password: { type: String },
    carts: { type: [cartSchema], default: [] }
})
mongoose.models = {}
export default mongoose.model("up", upSchema)