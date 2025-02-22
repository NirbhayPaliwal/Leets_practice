import user from "../models/userSchema.js"
import bcrypt from 'bcrypt';
import LeetCode from "leetcode-query";
import { generateToken } from "../lib/utils.js";
const login = async (req,res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;
        const exists = await user.findOne({username});
        if(exists){
            const isPasswordCorrect = await bcrypt.compare(password,exists.password);
            if(isPasswordCorrect){
                generateToken(exists._id,res);
                res.send({ok : 1});
            }
            else
            {
                res.send({
                ok: 0,
                errors: {
                    password : "Incorrect Password!",
                },
                });
            }
        }
        else{
            res.send({
                ok : 0,
                errors : {
                    username : "No such user exists!"
                }
            })
        }
        return ;
    }
    catch(err){
        res.send({ok :0 , message : "Internal Server Error"});
        console.log(err);
    }
};
const signup = async (req,res)=>{
    try{
        const leetcode = new LeetCode();
        const { username, email, password, leetcodeusername } = req.body;
        const exists = await user.findOne({
            username,
        });
        const rest = leetcode.user(leetcodeusername);
        if((await rest).matchedUser == null){
            res.send({
                ok : 0 ,
                errors : {
                    leetcodeusername : "No Such Leetcode User exists"
                }
            })
        }
        if (exists) {
            res.send({
                ok : 0,
                errors : {
                    username : "Username already exists choose different one!"
                }
            });
            return ;
        }
        else{
            const salt = await bcrypt.genSalt(10);
            const hashedpassword = await bcrypt.hash(password,salt);
            const newuser = new user({
                username,
                email,
               password:hashedpassword,
                leetcodeusername,
            });
            generateToken(newuser._id,res);
            await newuser.save();
            res.send({
                ok : 1,
            });
        }            
    }
    catch(err){
        console.log(err);
        res.send({ok : 0 , message : "Internal Server Error"});
    }
}
const checkauth = (req,res)=>{
    try{
        res.send({user : req.user});
    }catch(err){
        console.log(err);   
        res.send({ok : 0 , message : "Internal Server Error"});
    }
}
const logout = async(req,res)=>{
    try{
        res.cookie("jwt", "", { maxAge: 0 });
        return res.send({ok : 1});
    }
    catch(err){
        console.log(err);
        res.send({ok : 0 , message : "Internal Server Error" });
    }
}
export {login,signup,checkauth,logout};