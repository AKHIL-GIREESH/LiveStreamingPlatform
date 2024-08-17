import Cookies from "js-cookie";
import { User } from "@/types/User";

export const getUser = async (): Promise<User> => {
    try {
        const token = Cookies.get("token")
        console.log(token)
        if (!token) {
            throw new Error("Token not found");
        }
        const response = await fetch("http://localhost:3000/api/v1/auth/getSelf", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })

        const respJSON = await response.json();
        console.log(respJSON)
        const { user } = respJSON
        const data: User = { _id: user._id, username: user.username, email: user.email }
        return data

    } catch (e) {
        throw new Error("Unable to fetch user" + e)
    }
}