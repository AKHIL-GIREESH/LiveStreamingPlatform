//const { WebhookReceiver } = require('livekit-server-sdk');
require('dotenv').config();
const StreamSchema = require("../Model/StreamSchema")

let LiveKitModules;
async function loadLiveKitModules() {
  if (!LiveKitModules) {
    LiveKitModules = await import('livekit-server-sdk');
  }
  return LiveKitModules;
}

async function initializeClients() {
    const {WebhookReceiver} = await loadLiveKitModules();
  
    const receiver = new WebhookReceiver(
        process.env.LIVEKIT_API_KEY,
        process.env.LIVEKIT_API_SECRET
    );
  
    return receiver;
  }

// const receiver = new WebhookReceiver(
//     process.env.LIVEKIT_API_KEY,
//     process.env.LIVEKIT_API_SECRET
// );

const rawBodyMiddleware = (req, res, next) => {
    req.rawBody = '';
    console.log("Check0")
    req.setEncoding('utf8');
    req.on('data', chunk => {
        console.log("Check")
      req.rawBody += chunk;
    });
    req.on('end', () => {
        console.log("Check1")
      next();
    });
  };

const webhook = async (req, res) => {
    try {
        console.log("check")
        const receiver = await initializeClients();
        const authorization = req.get('Authorization')

        if (!authorization) {
            console.log("checkF")
            return res.status(400).json({ message: "No authorization header" });
        }

        // Validate the webhook
        const event = await receiver.receive(req.rawBody, authorization);

        //const event = await receiver.receive(req.body, req.get('Authorization'));

        let state;
        if (event.event === "ingress_started") {
            // Mark the stream as live
            state = await StreamSchema.findOneAndUpdate(
                { ingressID: event.ingressInfo.ingressId },
                { isLive: true },
                {new: true, runValidators: true}
            );


        
        }

        if (event.event === "ingress_ended") {
            // Mark the stream as not live
            state = await StreamSchema.findOneAndUpdate(
                { ingressID: event.ingressInfo.ingressId },
                { isLive: false },
                {new: true, runValidators: true}
            );

        }

        console.log(state)

        res.status(200).json({ message: "Webhook received successfully" });
    } catch (error) {
        console.error("Error processing webhook:", error);
        res.status(500).json({ message: "Webhook handling failed", error: error.message });
    }
}

module.exports = {webhook,rawBodyMiddleware}