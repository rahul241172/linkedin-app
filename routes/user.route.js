const express=require("express")
const {UserModel}=require("../models/user.model")
require("dotenv").config()
const users=express.Router()

const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")



users.get("/",async(req,res)=>{
    const q=req.headers.authorization
    jwt.verify(q,process.env.jwtsecret,async(err,decoded)=>{
        if(decoded){
            try{
                const data=await UserModel.find()
                res.send(data)
            }catch(err){
                res.send({
                    msg:"Something wrong"
                })
            }
        }
        else{
            res.send("Please login")
        }
    })
})



users.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city}=req.body
    try{
        const data=UserModel.find({email})
        if(data.length>0){
            res.send({msg:"User already exist, please login"})
        }else{
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    console.log(err)
                }else{
                const user=new UserModel({name,email,gender,password:hash,age,city})
                await user.save()
                res.send({msg:"User Registered"})
                }
            })
        }
    }catch(err){
        console.log(err)
    }
})


users.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user= await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    var token=jwt.sign({userID:user[0]._id},"rahul",{
                        expiresIn:`2h`,
                    });
                    res.send({msg:"Login Sucessfull",token:token})
                }
        });
        console.log(user)
    }
}catch(err){
        console.log(err)
    }
})



module.exports={
    users
}