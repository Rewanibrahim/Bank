import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const auth = () => {
    return async (req, res, next) => {
        try {
            const {token} = req.headers
            console.log(token);
            
            if (!token || !token.startsWith("rewan__")) {
                return res.status(401).json({ msg: "No token provided or invalid format!" });
            }

            const newToken = token.split("rewan__")[1];
            const decoded = jwt.verify(newToken, "rewan");

            if (!decoded || !decoded.username) {
                return res.status(401).json({ msg: "Invalid token payload!" });
            }

            const user = await userModel.findOne({ username: decoded.username });
            if (!user) {
                return res.status(404).json({ msg: "User not found!" });
            }

            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({ msg: "Authentication failed!", error: error.message });
        }
    };
};


























/*import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js"


export const auth = () => {
    return async (req,res,next) => {
      try {
        const {token} = req.headers
        if (!token){
            return res.status(400).json({msg: "Token not found !"})
        }
        if (!token.startsWith("rewan")){
            return res.status(400).json({msg: "Token not valid!"})
        }
        console.log(token);
        const newToken = token.split("rewan")[1]
        const decoded = jwt.verify(newToken, "rewan");
        if(!decoded?.username){
            return res.status(400).json({msg:"Invalid payload"})
        }
        const user = await userModel.findOne({username});
        if(!user){
            return res.status(400).json({msg:"User not found !"})
        }
        req.user = user
        next()
      } catch (error) {
        return res.status(400).json({msg: "catch error" ,error})
      }
    }
}*/
