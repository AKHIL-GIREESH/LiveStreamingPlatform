import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"

const FollowButton = () => {

    const {mutate:follow,isPending,error} = useMutation({
        mutationFn: async () => {
            
        }
    })

    

    return(
        
        <Button onClick={() => follow()}>
            Follow
        </Button>
    )
}

export default FollowButton