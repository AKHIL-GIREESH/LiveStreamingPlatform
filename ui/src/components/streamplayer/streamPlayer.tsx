import { LiveKitRoom } from "@livekit/components-react";
import { useViewerToken } from "@/Hooks/useViewerToken"
import Video from "./videoPlayer";
import Chat from "./Chat";


const StreamPlayer = ({id,hostname,hostid}:{id:string,hostname:string,hostid:string}) => {

    

    const {name,token,identity} = useViewerToken(hostid)

    console.log(identity)

    if(!token || !name || !identity){
        return(
                <>
                    Cannot Watch Stream
                </>
        )
    }
     console.log(import.meta.env.VITE_LIVEKIT_API_URL)

    return(<>
    <Chat streamId={hostid}/>
        <LiveKitRoom
        audio={true}
        video={true}
        token={token}
        serverUrl={import.meta.env.VITE_LIVEKIT_API_URL}>
            <div>
                <Video hostName={hostname} hostIdentity={hostid}/>
            </div>
            <div>
                {/* <Chat/> */}
            </div>
        </LiveKitRoom>
        
    </>)
}

export default StreamPlayer