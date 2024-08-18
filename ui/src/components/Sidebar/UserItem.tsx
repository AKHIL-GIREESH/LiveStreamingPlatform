import { UserItemProps } from "@/types/Sidebar"

const UserItem = ({isLive,username}:UserItemProps) => {
    return(
        <>
            <button className={isLive?"border border-red-600 w-full":"border border-black w-full"}>
                {username}
                
            </button>
            <br/>
            <br/>
        </>
    )
}

export default UserItem