import { useUser } from "@/AuthProvider"

const Stream = () => {
    const user = useUser()
    return(
        <>
            {user && user._id}'s Stream
        </>
    )
}

export default Stream