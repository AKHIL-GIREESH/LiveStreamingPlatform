import { Switch } from "@/components/ui/switch"
import { useGetStream } from "@/StreamContext"
import { useMutation } from "@tanstack/react-query"

const Chat = () => {

    const stream = useGetStream()
    console.log(stream)

    if(stream === null){
        return
    }

    const {isChatDelayed,isChatEnabled,isChatFollowersOnly} = stream

    const updateStreamHandler = (name : string,e :any) => {

        

        const {mutate,isPending,error} = useMutation({
            mutationFn: async () => { 
                
            }
        })
        
        mutate()
    }

    return(
    <>
        Chat
       <Switch checked={isChatDelayed} onClick={(e) => updateStreamHandler("isChatDelayed",e) }></Switch>
       <Switch checked={isChatEnabled} onClick={(e) => updateStreamHandler("isChatEnabled",e)}></Switch>
       <Switch checked={isChatFollowersOnly} onClick={(e) => updateStreamHandler("isChatFollowersOnly",e)}></Switch>
    </>
    )
}

export default Chat