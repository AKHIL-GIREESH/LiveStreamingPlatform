import { useUser } from "@/AuthProvider"

const Profile = () => {
    const user = useUser()
    console.log(user)
    return(
        <>
            {user === null?<>
                Login
            </>:<>{user.username}</>}
        </>
    )
}

export default Profile