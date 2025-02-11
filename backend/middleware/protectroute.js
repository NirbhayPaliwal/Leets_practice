import jwt from "jsonwebtoken";
import user from "../models/userSchema.js";
const checktoken = async (req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        if(!token){
            next();
            return ;
        }
        const w =  jwt.verify(token, process.env.JWT_SECRET);
        let userId = null;
        if(w){
            userId = w.userId;            
        }

        if (userId) {
            const result = await user.findById(userId);
            if(result)
                req.user = result.username;
        }
        next();        
    }    
    catch(err){
        console.log(err);
        next()
    }
}
export default checktoken;