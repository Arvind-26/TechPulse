import up from "../../models/up";
import connectdb from "../../connection/connection";

const handler = async (req, res) => {
    try {
        if (req.method == 'POST') {
            for (let i = 0; i < req.body.length; i++) {
                const { user, carts } = req.body[i];

                let existingProduct = await up.findOne({ "username": user });

                existingProduct.carts = existingProduct.carts.concat(carts);
                await existingProduct.save();

            }
        }
        else if (req.method == 'DELETE') {
            for (let i = 0; i < req.body.length; i++) {
                const { user, id } = req.body[i];

                let existingProduct = await up.findOne({ "username": user });

                await existingProduct.carts[id].deleteOne();
                await existingProduct.save();
            }
        }

        let products = await up.find();
        res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default connectdb(handler);
