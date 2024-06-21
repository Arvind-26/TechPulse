import product from "../../models/product"
import connectdb from "../../connection/connection"

const handler = async (req,res)=>{
    let products = await product.find().limit( 20 )
    res.status(200).json({products})
}
export default connectdb(handler);
