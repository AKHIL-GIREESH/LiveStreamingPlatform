//import { useUser } from "@/AuthProvider"
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
        </>
    )
}

export default Stream