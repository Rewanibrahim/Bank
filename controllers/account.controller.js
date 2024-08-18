import accountModel from '../models/account.model.js';
import Transaction from '../models/trans.model.js';
import multer from 'multer';
const upload = multer({ dest: 'uploads/documents' });

const asyncHandler = (fn) =>{
    return(req,res,next) =>{
       fn(req,res,next).catch((err) => {
        res.status(500).json({msg: "catch error",err})
        next(err)
       })
    }
}
//<<<<<<<<<<<<<<<<<<<<<<<<<<< Account creation >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const createAccount = asyncHandler(async (req, res,next) => {
    const user = req.user;

        console.log('Files received:', req.files);
        let documents = [];
        if (req.files) {
            documents = req.files.map(file => file.path);
        }

        const account = await accountModel.create({ userId: user._id, documents, balance: user.balance });
        res.status(201).json({ message: 'Account created successfully', account });
});



//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Deposit >>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const deposit = asyncHandler(async (req, res,next) => {
        const user = req.user;
        const { accountId, amount } = req.body;

        const account = await accountModel.findOne({ _id: accountId, userId: user._id });
        console.log(account)
        if (!account) {
            return next(new Error("Account not found",{cause:404}))
        }

        account.balance += amount;
        await account.save();

        const transaction = await Transaction.create({ accountId, type: 'deposit', amount });
        res.json({ message: 'Deposit successful', balance: account.balance, transaction });
});


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Withdraw >>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const withdraw = asyncHandler( async (req, res,next) => {
        const user = req.user;
        const { accountId, amount } = req.body;

        const account = await accountModel.findOne({ _id: accountId, userId: user._id });
        if (!account) {
            next(new Error("Account not found",{cause:404}))
        }

        if (account.balance < amount) {
            next(new Error("Insufficient balance",{cause:404}))
        }

        account.balance -= amount;
        await account.save();

        const transaction = await Transaction.create({ accountId, type: 'withdraw', amount });
        res.json({ message: 'Withdrawal successful', balance: account.balance, transaction });
});


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Reterive balance >>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const getBalance =asyncHandler( async (req, res,next) => {
        const user = req.user;
        const { accountId } = req.body;

        const account = await accountModel.findOne({ _id: accountId, userId: user._id });
        if (!account) {
            next(new Error("Account not found",{cause:404}))
        }

        res.json({ balance: account.balance });
});


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Transactions Historyy  >>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const getTransactions =asyncHandler( async (req, res,next) => {
        const user = req.user;
        const { accountId } = req.body;

        const account = await accountModel.findOne({ _id: accountId, userId: user._id });
        if (!account) {
            next(new Error("Account not found",{cause:404}))
        }

        const transactions = await Transaction.find({ accountId });
        res.json({ transactions });
});


export const uploadDocuments = upload.array('documents', 10);
