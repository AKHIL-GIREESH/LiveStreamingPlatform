//import { useUser } from "@/AuthProvider"
import StreamPlayer from "@/components/streamplayer/streamPlayer"
import { useGetStream } from "@/StreamContext"

const Stream = () => {
    const stream = useGetStream()
    console.log(stream)

    if(stream === null){
        throw new Error("Something went wrong")
    }
    return(
        <> 
            {stream.name}
            Streamplayer with user,stream and following as props 
            <StreamPlayer/> 
        </>
    )
}

export default Stream