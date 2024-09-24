import { updateKeyStream } from "@/API/updateKeyStream"
import { useUser } from "@/AuthProvider"
import { Button } from "@/components/ui/button"
import { useGetStream, useSetStream } from "@/StreamContext"
import { useMutation } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"

const Keys = () => {

    const stream = useGetStream()
    const user = useUser()
    const setStream = useSetStream()
    console.log(stream)

    if((stream  === null) || (user === null)){
        return
    }

    const {mutate,isPending,error} = useMutation({
        mutationFn: async () => {
            const newStream = await updateKeyStream(user._id)
            setStream(newStream)
        }
    })

    if(isPending){
        return(
            <Button disabled>
                Loading
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </Button>
        )
    }

    if(error){
        console.log(error)
        return(<>Something went wrong</>)
    }
    
    return(
    <>Keys<br/>
    <input className="border-2 border-black  m-1" type="text" disabled placeholder="Server URL" value={stream.serverURL}/>
    <input className="border-2 border-black  m-1" type="text" disabled value={stream.streamKey} placeholder="Stream Key"/>
    <br/><br/>
    {
        isPending?
        <Button disabled>Loading
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </Button>:
        <Button onClick={() => mutate()}>Generate</Button>
    }
    </>)
}

export default Keys