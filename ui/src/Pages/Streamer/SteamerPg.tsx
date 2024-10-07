import { Button } from "@/components/ui/button"
import { useParams } from "react-router"
import FollowButton from "./FollowButton"
import { useFollowCheck } from "@/Hooks/FollowCheck"
import UnfollowButton from "./UnfollowButton"
import StreamPlayer from "@/components/streamplayer/streamPlayer"
import { useUser } from "@/AuthProvider"

const StreamerPg = () => {
    const {id} = useParams()
    const user = useUser()
    //const stream = useGetStream()
    //console.log(stream)

    if(user === null){
        return(<>Something went wrong</>)
    }
    
    if(id === undefined){
        throw new Error("User not found")
    }

    let condition = useFollowCheck(id)
    return(
        <div>
            {id}<br/>
            {condition === null?<Button disabled={true}>Login to Follow</Button>:condition?<UnfollowButton id={id}/>:<FollowButton id={id}/>}
            <StreamPlayer id={user._id} hostname={id} hostid="66fab6f191b93db3b96da3ff"/>
        </div>
    )
}

export default StreamerPg