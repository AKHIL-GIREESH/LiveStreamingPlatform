import { useSetAuth } from "@/AuthProvider"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { unfollowFunc } from "@/API/unFollow"

const UnfollowButton = ({id}:{id:string}) => {
    const setUser = useSetAuth()

    const {mutate:unfollow,isPending,error} = useMutation({
        mutationFn: async () => {
            const updatedUser = await unfollowFunc(id)
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
        <Button onClick={() => unfollow()}>
            {error?"Retry":"Unfollow"}
        </Button>
    )
}

export default UnfollowButton