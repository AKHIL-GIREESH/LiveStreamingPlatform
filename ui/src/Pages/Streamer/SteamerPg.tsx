import { Button } from "@/components/ui/button"
import { useParams } from "react-router"
import FollowButton from "./FollowButton"
import { useFollowCheck } from "@/Hooks/FollowCheck"
import UnfollowButton from "./UnfollowButton"

const StreamerPg = () => {
    const {id} = useParams()
    
    if(id === undefined){
        throw new Error("User not found")
    }

    let condition = useFollowCheck(id)
    return(
        <div>
            {id}<br/>
            {condition === null?<Button disabled={true}>Login to Follow</Button>:condition?<UnfollowButton id={id}/>:<FollowButton id={id}/>}
        </div>
    )
}

export default StreamerPg