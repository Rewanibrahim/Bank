import mongoose from "mongoose";

const connectionDB = async ()=>{
    return await mongoose.connect("mongodb://127.0.0.1:27017/Bank")
    .then(()=>{
        console.log("Connected to database");
        
    }).catch((err) => {
        console.log({msg: "fail to connect to database", err})
        
    })
}
export default connectionDB