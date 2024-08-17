import { UserItemProps } from "@/types/Sidebar"

const UserItem = ({id,username}:UserItemProps) => {
    return(
        <>
            {username}
        </>
    )
}

export default UserItem