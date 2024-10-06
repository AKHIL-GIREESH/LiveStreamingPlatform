import { LiveKitRoom } from "@livekit/components-react";
import { useViewerToken } from "@/Hooks/useViewerToken"
import Video from "./videoPlayer";
import Chat from "./Chat";


const StreamPlayer = ({id,hostname}:{id:string,hostname:string}) => {

    //const stream = 

    const {name,token,identity} = useViewerToken(id)

    if(!token || !name || !identity){
        return(
                <>
                    Cannot Watch Stream
                </>
        )
    }
     console.log(import.meta.env.VITE_LIVEKIT_API_URL)

    return(<>
        <LiveKitRoom
        token={token}
        serverUrl={import.meta.env.VITE_LIVEKIT_API_URL}>
            <div>
                <Video hostName={hostname} hostIdentity={id}/>
            </div>
            <div>
                {/* <Chat/> */}
            </div>
        </LiveKitRoom>
        <Chat streamId={"1234"}/>
    </>)
}

export default StreamPlayer