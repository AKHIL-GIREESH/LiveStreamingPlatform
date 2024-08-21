import { followFunc } from "@/API/Follow"
import { useSetAuth } from "@/AuthProvider"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"

const FollowButton = ({id}:{id:string}) => {

    const setUser = useSetAuth()

    const {mutate:follow,isPending,error} = useMutation({
        mutationFn: async () => {
            const updatedUser = await followFunc(id)
            console.log(updatedUser)
            setUser(updatedUser)
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

    return(
        <Button onClick={() => follow()}>
            {error?"Retry":"Follow"}
        </Button>
    )
}

export default FollowButton