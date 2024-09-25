const Stream = require("../Model/StreamSchema")

const CreateStream = async (req,res) => {
    try{
        const userID = req.params.id
        const stream = await Stream.create({
            userID:userID,
            name:"Stream"
        })

        res.status(200).json({status:"Success",
        stream:stream})
    }catch(e){
        res.status(500).json({status:"Failed",Err:e})
    }   
}

const updateStream = async(req,res) => {
    try{
        const userID = req.params.id
        const {name,thumbnailURL,isChatEnabled,isChatDelayed,isChatFollowersOnly,ingressID,serverURL,streamKey} = await Stream.findOneAndUpdate({userID:userID},req.body,{new: true, runValidators: true})
        const stream = {name,thumbnailURL,isChatEnabled,isChatDelayed,isChatFollowersOnly,ingressID,serverURL,streamKey}
        res.status(200).json({status:"Success",
        stream:stream})
    }catch(e){
        res.status(500).json({status:"Failed",Err:e})
    }
}

const getStream = async(req,res) => {
    try{
        const userID = req.params.id
        const {name,thumbnailURL,isChatEnabled,isChatDelayed,isChatFollowersOnly,ingressID,serverURL,streamKey} = await Stream.findOne({userID:userID})
        const stream = {name,thumbnailURL,isChatEnabled,isChatDelayed,isChatFollowersOnly,ingressID,serverURL,streamKey}
        res.status(200).json({status:"Success",
        stream:stream})

    }catch(e){
        res.status(500).json({status:"Failed",Err:e})
    }
}

module.exports = {CreateStream,updateStream,getStream}