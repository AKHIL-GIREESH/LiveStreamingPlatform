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
        minlength:1,
        default:null
    },
    serverURL:{
        type:String,
        minlength:1,
        default:null
    },
    streamKey:{
        type:String,
        minlength:1,
        default:null
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
        ref:"users",
        unique:true,
        required:true,
        index: true
    }
}, {
    timestamps: true
  })

module.exports = mongoose.model("streams",StreamSchema)