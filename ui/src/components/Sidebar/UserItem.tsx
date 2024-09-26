import { UserItemProps } from "@/types/Sidebar"
import { Link } from "react-router-dom"

const UserItem = ({isLive,username,id}:UserItemProps) => {
    return(
        <Link to={`/${id}`}>
            <button className={isLive?"border border-red-600 w-full":"border border-black w-full"}>
                    {username}  
            </button>
            <br/>
            <br/>
        </Link>
    )
}

export default UserItem