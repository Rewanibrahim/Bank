import mongoose, {Schema , model} from "mongoose";

const accountSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
         required: true 
        },
    balance: { 
        type: Number,
         default: 0 
        },
    documents: [{
         type: String 
        }]
});

const accountModel= model("Account",accountSchema)
export default accountModel;