import { getRecommendedUsers } from "@/API/getRecommendedUsers"
import { useQuery } from "@tanstack/react-query"
import UserItem from "./UserItem"

const Recommended = () => {

    const {error,isLoading,data} = useQuery({
        queryKey:["rUsers"],
        queryFn: getRecommendedUsers
    })
    return(
        <>
            Recommended<br/>
            {isLoading && <>Loading...</>}
            {error &&<>Refresh</>}
            {data && data.map(({_id,username}) => (<UserItem id={_id} username={username} isLive={true}/>))}
        </>

    )
}

export default Recommended