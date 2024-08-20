import { User } from "@/types/User"
import Cookies from "js-cookie";

export const getRecommendedUsers = async (): Promise<User[]> => {
    try {
        const token = Cookies.get("token")
        if (!token) {
            throw new Error("No Token")
        }
        const resp = await fetch("http://localhost:3000/api/v1/auth/", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })

        const respJSON = await resp.json()
        console.log(respJSON)
        const { users }: { users: User[] } = respJSON
        return users

    } catch (e) {
        throw new Error("Recommended Users not found")
    }
}