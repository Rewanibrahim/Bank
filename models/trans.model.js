import mongoose, {Schema , model} from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
    accountId: { 
         type: mongoose.Schema.Types.ObjectId, ref: 'Account',
         required: true 
        },
    type: {
         type: String, 
         enum: ['deposit', 'withdraw', 'balance'], 
         required: true 
        },
    amount: { 
        type: Number 
    },
    date: {
         type: Date,
          default: Date.now 
        }
});

const transModel= model("Transaction",transactionSchema)
export default transModel;