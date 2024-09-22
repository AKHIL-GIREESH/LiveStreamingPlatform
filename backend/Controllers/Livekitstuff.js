require('dotenv').config();

// Load LiveKit SDK modules once
let LiveKitModules;
async function loadLiveKitModules() {
  if (!LiveKitModules) {
    LiveKitModules = await import('livekit-server-sdk');
  }
  return LiveKitModules;
}

// Initialize clients dynamically
async function initializeClients() {
  const {
    RoomServiceClient,
    IngressClient
  } = await loadLiveKitModules();

  const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL,
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET
  );

  const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL);

  return { roomService, ingressClient };
}

// Function to reset ingresses
async function resetIngresses(hostIdentity) {
  const { roomService, ingressClient } = await initializeClients();

  // List and delete all ingresses and rooms for the host
  const ingresses = await ingressClient.listIngress({ roomName: hostIdentity });
  const rooms = await roomService.listRooms([hostIdentity]);

  for (const room of rooms) {
    await roomService.deleteRoom(room.name);
  }

  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
}

// Function to create ingress
async function createIngress(ingressType, userId, username) {
  const {
    IngressInput,
    TrackSource,
    IngressVideoEncodingPreset,
    IngressAudioEncodingPreset
  } = await loadLiveKitModules();

  await resetIngresses(userId);

  // Create Ingress options based on type (WHIP or RTMP)
  const options = {
    name: username,
    roomName: userId,
    participantName: username,
    participantIdentity: userId,
  };

  if (ingressType === IngressInput.WHIP_INPUT) {
    options.bypassTranscoding = true;
  } else {
    options.video = {
      source: TrackSource.CAMERA,
      preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
    };
    options.audio = {
      source: TrackSource.MICROPHONE,
      preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
    };
  }

  // Initialize clients for ingress creation
  const { ingressClient } = await initializeClients();

  // Create new ingress
  const ingress = await ingressClient.createIngress(ingressType, options);

  if (!ingress || !ingress.url || !ingress.streamKey) {
    throw new Error('Failed to create ingress');
  }

  return ingress;
}

// Express Route to create ingress
const createLiveKitStuff = async (req, res) => {
  try {
    const userId = req.body.userId; // Get userId from request (e.g., JWT or session)
    const username = req.body.username;

    // Get the ingressType correctly from the request body
    const { IngressInput } = await loadLiveKitModules();
    const ingressType = req.body.ingressType === "WHIP" 
        ? IngressInput.WHIP_INPUT 
        : IngressInput.RTMP_INPUT; // Default to RTMP

    const ingress = await createIngress(ingressType, userId, username);
    res.json({ success: true, ingress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { createLiveKitStuff };
