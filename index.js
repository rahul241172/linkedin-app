const express=require("express")
const app=express()
const {connection}=require("./config/db")
const {users}=require("./routes/user.route")
const {posts}=require("./routes/post.route")
const cors=require("cors")
require("dotenv").config()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send({msg:"welcome to homepage"})
})
app.use("/users",users)
app.use("/posts",posts)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("server running")
    }catch(err){
        console.log(err)
    }
})