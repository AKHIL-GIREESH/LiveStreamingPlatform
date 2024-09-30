const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")

const TokenMiddleWare = (req,res,next) => {
    let self
    //console.log(req.headers.authorization)
    try{
        if(req.headers.authorization === "NoToken"){
            const id = new mongoose.Types.ObjectId()
            const username = `guest-${Math.floor(Math.random() * 100000)}`;
            self = { id, username }
        }else{
            //console.log(req.headers.authorization)
            const token = req.headers.authorization.split(" ")[1]
            self = jwt.verify(token,process.env.secret)
        }
        req.user = self
    }catch(e){
        res.status(500).send("Something went wrong a : "+e)
    }
    next()
}

module.exports =  TokenMiddleWare