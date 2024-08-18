import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import userModel from '../models/user.model.js';
const upload = multer({ dest: 'uploads/profile_pics' });

const asyncHandler = (fn) =>{
    return(req,res,next) =>{
       fn(req,res,next).catch((err) => {
        res.status(500).json({msg: "catch error",err})
        next(err)
       })
    }
}
//<<<<<<<<<<<<<<<<<<<<< User registeration >>>>>>>>>>>>>>>>>>>>>>>>>
export const register = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    const existingUser = await userModel.findOne({ username });
    console.log(existingUser);

    //if (existingUser) {
    //    return next(new Error("Username is already taken", { cause: 409 }));
   // }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
});



//<<<<<<<<<<<<<<<<<<< User login >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const login = asyncHandler(async (req, res,next) => {
        const { username, password } = req.body;
        const user = await userModel.findOne({username});
        if (!user) {
            next(new Error("Your username or password is incorrect!",{cause:404}))
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            next(new Error("Your password is incorrect!",{cause:404}))
        }

        const token = jwt.sign(
            {username: user.username },'rewan',{ expiresIn: '2h' }
        );

        res.status(200).json({ message: 'Login successful', token });
});

export const uploadProfilePicture = upload.single('profilePicture');
