const jwt=require("jsonwebtoken")
require("dotenv").config()


const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        jwt.verify(token,process.env.jwtsecret,async(err,decoded)=>{
            if(decoded){
                const userID=decoded.userID
                req.body.userID=userID
                console.log(decoded)
                next()
            }
            else{
                res.send({msg:"Please Login"})
            }
        })
    }
    else{
        res.send({msg:"Please Login"})
    }
}


module.exports={
    authenticate
}