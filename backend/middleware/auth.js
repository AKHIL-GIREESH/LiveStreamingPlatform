const jwt = require("jsonwebtoken")

const AuthMiddleware = (req,res,next) => {
    try{
        console.log("check")
        const token = req.headers.authorization.split(" ")[1]
        const user = jwt.verify(token,process.env.secret)
        req.user = user
        console.log('works')
    }catch(e){
        res.status(500).send("Something went wrong : "+e)
    }
    next()
}

module.exports =  AuthMiddleware