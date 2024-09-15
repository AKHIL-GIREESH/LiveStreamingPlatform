import { updateStream } from "@/API/updateStream"
import { useUser } from "@/AuthProvider"
import { Switch } from "@/components/ui/switch"
import { useGetStream, useSetStream } from "@/StreamContext"
import { Stream, StreamChat } from "@/types/Stream"
import { useMutation } from "@tanstack/react-query"

const Chat = () => {

    const stream = useGetStream()
    const user = useUser()
    const setStream = useSetStream()
    console.log(stream)

    if((stream  === null) || (user === null)){
        return
    }

    const {isChatDelayed,isChatEnabled,isChatFollowersOnly} = stream

    const {mutate,isPending,error} = useMutation({
        mutationFn: async (newStreamData : StreamChat) => { 
            const newStream = await updateStream(user._id,newStreamData)
            setStream(newStream)
        }
    })

    const updateStreamHandler = (n : keyof Stream) => {
        console.log({[n]:stream[n]?false:true})
        mutate({[n]:stream[n]?false:true})
    }

    if(isPending){
        return(<>Updating...</>)
    }

    if(error){
        return(<>Something went wrong {error}</>)
    }

    return(
    <>
        Chat
       <Switch checked={isChatDelayed} onClick={() => updateStreamHandler("isChatDelayed") }></Switch>
       <Switch checked={isChatEnabled} onClick={() => updateStreamHandler("isChatEnabled")}></Switch>
       <Switch checked={isChatFollowersOnly} onClick={() => updateStreamHandler("isChatFollowersOnly")}></Switch>
    </>
    )
}

export default Chat