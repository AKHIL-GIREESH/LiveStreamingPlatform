import { useUser } from "@/AuthProvider"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"

const Profile = () => {
    const user = useUser()
    console.log(user)
    return(
        <Button>
                {user === null?<Link to="/login">
                Login
            </Link>:<Link to="/me">{user.username}</Link>}
        </Button>
    )
}

export default Profile