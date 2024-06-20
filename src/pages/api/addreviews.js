import product from "../../models/product";
import connectdb from "../../connection/connection";

const handler = async (req, res) => {
    try {

        for (let i = 0; i < req.body.length; i++) {
            const { _id, reviews } = req.body[i];

            let existingProduct = await product.findById(_id);

            existingProduct.reviews = existingProduct.reviews.concat(reviews);
            await existingProduct.save();
        }

        let products = await product.find();
        res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default connectdb(handler);
