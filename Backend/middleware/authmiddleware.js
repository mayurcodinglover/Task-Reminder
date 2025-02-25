import jwt from "jsonwebtoken"
import User from "../models/User.js"

const protect=async (req,res,next)=>{
    let token=req.headers.auth;
    console.log(token);
    
    if(token && token.startsWith("Bearer")){
        try {
            token=token.split(" ")[1];
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user=await User.findById(decode.id).select("-password");
            console.log(req.user);
            next();
        } catch (error) {
            res.status(401).json({message:"Not authorized,token failed"});
        }
    }
    else{
        res.status(401).json({message:"Not authorized ,no token"})
    }
}
export default protect;