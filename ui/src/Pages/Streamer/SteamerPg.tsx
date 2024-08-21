import { Button } from "@/components/ui/button"
import { useParams } from "react-router"
import FollowButton from "./FollowButton"
import { useFollowCheck } from "@/Hooks/FollowCheck"

const StreamerPg = () => {
    const {id} = useParams()
    
    if(id === undefined){
        throw new Error("User not found")
    }

    let condition = useFollowCheck(id)
    return(
        <div>
            {id}<br/>
            {condition === null?<Button disabled={true}>Login to Follow</Button>:condition?<Button disabled={true}>Following</Button>:<FollowButton/>}
        </div>
    )
}

export default StreamerPg