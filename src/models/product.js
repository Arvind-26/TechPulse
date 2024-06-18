import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    key: { type: String, required: true },
    value: { type: String, required: true }
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number },
    desc: { type: String },
    img: { type: String },
    reviews: { type: [reviewSchema], default: [] } 
});

export default mongoose.models.product || mongoose.model('product', productSchema);

