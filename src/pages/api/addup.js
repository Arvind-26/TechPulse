import up from "../../models/up";
import connectdb from "../../connection/connection";

const handler = async (req, res) => {
    if (req.method == 'DELETE') {
        const { user } = req.body;

        let existingProduct = await up.findOne({ "username": user });
        await existingProduct.deleteOne();
        await existingProduct.save();
    }
    else {
        for (let i = 0; i < req.body.length; i++) {
            let p = new up({
                firstname: req.body[i].firstname,
                lastname: req.body[i].lastname,
                username: req.body[i].username,
                email: req.body[i].email,
                address: req.body[i].address,
                password: req.body[i].password
            })
            await p.save()
        }
    }
    let users = await up.find()
    res.status(200).json({ users })
}

export default connectdb(handler)