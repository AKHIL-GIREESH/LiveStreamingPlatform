import { useUser } from "@/AuthProvider"

const Profile = () => {
    const user = useUser()
    console.log(user)
    return(
        <div className="text-white">
            {user === null?<>
                Login
            </>:<>{user.username}</>}
        </div>
    )
}

export default Profile