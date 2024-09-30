require("dotenv")

let LiveKitModules;
async function loadLiveKitModules() {
  if (!LiveKitModules) {
    LiveKitModules = await import('livekit-server-sdk');
  }
  return LiveKitModules;
}

// Initialize clients dynamically
// async function initializeClients() {
//   const {
//     AccessToken
//   } = await loadLiveKitModules();

// }

const createViewerToken = async (req,res) => {
    //console.log(req)
    const self = req.user
    const host = req.params

    //console.log(self)

    const {AccessToken} = await loadLiveKitModules();
    
    const isHost = self.id === host.id
    const token = new AccessToken(
        process.env.LIVEKIT_API_KEY,
        process.env.LIVEKIT_API_SECRET,
        {
          identity: isHost ? `Host-${self.id}` : self.id.toString(),
          name: self.username,
        }
      );

    token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
    });

    const userToken = await Promise.resolve(token.toJwt());
    res.status(200).json({token:userToken})
}

module.exports = createViewerToken