//import { useUser } from "@/AuthProvider"
import { useUser } from "@/AuthProvider"
import StreamPlayer from "@/components/streamplayer/streamPlayer"
import { useGetStream } from "@/StreamContext"

const Stream = () => {
    const user = useUser()
    const stream = useGetStream()
    console.log(stream)

    if(stream === null || user === null){
        return(<>Something went wrong</>)
    }
    return(
        <> 
            {stream.name}
            Streamplayer with user,stream and following as props 
            <StreamPlayer id={user._id} hostname={user.username}/> 
        </>
    )
}

export default Stream