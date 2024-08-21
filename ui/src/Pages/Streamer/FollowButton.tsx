import { followFunc } from "@/API/Follow"
import { useSetAuth } from "@/AuthProvider"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"

const FollowButton = ({id}:{id:string}) => {

    const setUser = useSetAuth()

    const {mutate:follow,isPending,error} = useMutation({
        mutationFn: async () => {
            const updatedUser = await followFunc(id)
            console.log(updatedUser)
            setUser(updatedUser)
        }
    })

    

    return(
        <Button onClick={() => follow()}>
            {isPending?"Loading..":error?"Retry":"Follow"}
        </Button>
    )
}

export default FollowButton