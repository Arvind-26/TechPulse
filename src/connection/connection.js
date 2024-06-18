import mongoose from "mongoose"

const connectdb = handler => async (req,res) =>{
    if(mongoose.connections[0].readyState){
        return handler(req,res)
    }
    await mongoose.connect(process.env.Monogodb_uri)
    return 0
}

export default connectdb