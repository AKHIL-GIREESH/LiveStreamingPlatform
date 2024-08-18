import { useUser } from "@/AuthProvider"

const ProfilePg = () => {
    const user = useUser()
    if(!user){
        throw new Error("User not found!")
    }
    return(
        <div>
            {user.username}<br/>
            {user.email}<br/>
        </div>
    )
}

export default ProfilePg