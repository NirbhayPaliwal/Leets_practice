import jwt from "jsonwebtoken";
import user from "../models/userSchema.js";
const checktoken = async (req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        if(!token){
            res.send({ ok: 0, message: "Internal server error" });
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
        if(!req.user){  res.send({ok : 0 , message : "Internal server error"}); return ;}        
        next();        
    }    
    catch(err){
        console.log(err);
        next()
    }
}
export default checktoken;