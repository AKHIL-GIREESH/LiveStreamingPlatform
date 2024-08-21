import Cookies from "js-cookie"
import { User } from "@/types/User"

export const followFunc = async (id: string): Promise<User> => {
    try {
        const token = Cookies.get("token")

        if (!token) {
            throw new Error("Token not found/ Expired")
        }

        const response = await fetch(`http://localhost:3000/api/v1/auth/follow/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })

        const respJSON = await response.json()
        console.log(respJSON)
        return respJSON.user
    } catch (e) {
        throw new Error("Something went wrong: " + e)
    }
}