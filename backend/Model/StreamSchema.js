const mongoose = require("mongoose")

const StreamSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    thumbnailURL:{
        type:String,
        default:"https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png"
    },
    ingressID:{
        type:String,
        minlength:1
    },
    serverURL:{
        type:String,
        minlength:1
    },
    streamKey:{
        type:String,
        minlength:1
    },
    isLive:{
        type:Boolean,
        default:false
    },
    isChatEnabled:{
        type:Boolean,
        default:true
    },
    isChatDelayed:{
        type:Boolean,
        default:false
    },
    isChatFollowersOnly:{
        type:Boolean,
        default:false
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
}, {
    timestamps: true
  })

module.exports = mongoose.model("streams",StreamSchema)