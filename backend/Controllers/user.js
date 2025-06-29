const REGUSER = require("../Model/UserSchema");
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const regSignUp = async (req, res) => {
  try {
    const salt = await bycrpt.genSalt(10);
    const { username, email, password } = req.body;
    const Password = await bycrpt.hash(password, salt);
    const user = await REGUSER.create({ ...req.body, password: Password });
    if (user) {
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.secret,
        { expiresIn: "30d" }
      );
      res.status(200).json({ Status: "Success", token: token, user: user });
    }
  } catch (e) {
    res.status(500).json({ Status: "Failed", Err: e });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await REGUSER.findOne({ email: email });
    if (user) {
      const verify = bycrpt.compare(password, user.password);
      if (verify) {
        const token = jwt.sign(
          { username: user.username, id: user._id },
          process.env.secret,
          { expiresIn: "30d" }
        );
        res.status(200).json({ Status: "Success", token: token, user: user });
      } else {
        res.status(400).json({ Status: "Failed", Err: "Wrong Creds" });
      }
    } else {
      res.status(404).json({ Status: "Failed", Err: "User not found" });
    }
  } catch (e) {
    res.status(500).json({ Status: "Failed", Err: e });
  }
};

const getUser = async (req,res) => {
  try{
    const authHeader = req.headers.authorization
    const token = authHeader.split(" ")[1]
    const decodedToken = jwt.verify(token,process.env.secret)
    //console.log(user)
    const user = await REGUSER.findOne({_id:decodedToken.id})
    res.status(200).json({Status:"success",user:user})
  }catch(e){
    res.status(500).json({ Status: "Failed", Err: e });
  }
}

const getAllUsers = async (req,res) => {
  try{
    const userID = req.user.id
    const allUsers = await REGUSER.find({_id:{$ne:userID}})
    //console.log(allUsers)
    let newAllUsers = allUsers.map(({_id,username,email,password,__v,isLive}) => ({_id,username,email,isLive}))
    res.status(200).json({status:"Success",users:newAllUsers})
  }catch(e){
    res.status(500).json({ Status: "Failed", Err: e });
  }
}

const follow = async (req,res) => {
  try{
    const userID = req.user.id
    const followID = req.params.id

    let updatedUser = await REGUSER.findOneAndUpdate({_id:userID},{ $push: { following: followID } },{new: true, runValidators: true})
    await REGUSER.updateOne({_id:followID},{ $push: { followers: userID } })

    const {_id,username,email,followers,following,isLive} = updatedUser
    updatedUser = {id:_id,username:username,email:email,followers:followers,following:following,isLive:isLive}
    
    res.status(200).send({Status:"Success",user:updatedUser})

  }catch(e){
    res.status(500).json({Status:"Failed",Err:e})
  }
}

const unfollow = async (req,res) => {
  try{
    const userID = req.user.id
    const unfollowID = req.params.id

    let updatedUser = await REGUSER.findOneAndUpdate({_id:userID},{ $pull: { following: unfollowID } },{new: true, runValidators: true})
    await REGUSER.updateOne({_id:unfollowID},{ $pull: { followers: userID } })

    const {_id,username,email,followers,following,isLive} = updatedUser
    updatedUser = {id:_id,username:username,email:email,followers:followers,following:following,isLive:isLive}
    
    res.status(200).send({Status:"Success",user:updatedUser})

  }catch(e){
    res.status(500).json({Status:"Failed",Err:e})
  }
}

module.exports = { regSignUp, login, getUser, getAllUsers, follow, unfollow };
