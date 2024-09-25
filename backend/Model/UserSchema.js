const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
  },
  isLive:{
    type:Boolean,
    default:false
  },
  following:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"users"
  }],
  followers:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users"
  }]
});

module.exports = mongoose.model("users", UserSchema);
