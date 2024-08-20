import { useUser } from "@/AuthProvider"
import { Button } from "@/components/ui/button"
import { useParams } from "react-router"

const StreamerPg = () => {
    const {id} = useParams()
    console.log(id)
    let condition:boolean = false
    const user = useUser()
    if(user !== null){
        for(let i=0;i<user.following.length;i++){
            if(id === user.following[i]){
                condition = true
                break
            }
        }
    }
    return(
        <div>
            {id}
            {user === null?"Login to Follow":condition?"Following":"Follow"}
        </div>
    )
}

export default StreamerPg