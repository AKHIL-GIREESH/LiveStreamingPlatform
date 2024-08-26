import { useUser } from "@/AuthProvider"

const ProfilePg = () => {
    const user = useUser()
    if(!user){
        return(<div>
            Login to View
        </div>)
    }
    return(
        <div>
            {user.username}<br/>
            {user.email}<br/>
        </div>
    )
}

export default ProfilePg