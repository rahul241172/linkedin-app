const express=require("express")
const {PostModel}=require("../models/post.model")
const {authenticate}=require("../middleware/authenticate")
require("dotenv").config()
const posts=express.Router()





posts.get("/",authenticate,async(req,res)=>{
    const userID=req.body.userID
            try{
                const data=await PostModel.find({userID})
                res.send(data)
            }catch(err){
                res.send({
                    msg:"Something wrong"
                })
            }
})



posts.post("/create",authenticate,async(req,res)=>{
    const payload=req.body
    try{
        const data=new PostModel(payload)
        await data.save()
            res.send({msg:"Posted"})
    }catch(err){
        console.log(err)
    }
})


posts.patch("/update/:id",authenticate,async(req,res)=>{
    let payload=req.body
    let id=req.params.id
    let post=await PostModel.findOne({"_id":id})
    let user=post.userID
    let user_requested=req.body.userID
    try{
        if(user!=user_requested){
            res.send({msg:"You are not authorized"})
        }
        else{
            let data=await PostModel.findByIdAndUpdate({"_id":id},payload)
            res.send("Updated")
        }
}catch(err){
        console.log(err)
    }
})


posts.delete("/delete/:id",authenticate,async(req,res)=>{
    let id=req.params.id
    let post=await PostModel.findOne({"_id":id})
    let user=post.userID
    let user_requested=req.body.userID
    try{
        if(user!=user_requested){
            res.send({msg:"You are not authorized"})
        }
        else{
            let data=await PostModel.findByIdAndDelete({"_id":id})
            res.send("deleted")
        }
}catch(err){
        console.log(err)
    }
})
module.exports={
posts
}