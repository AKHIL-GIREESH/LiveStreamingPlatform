import { User } from "@/types/User"

export const getRecommendedUsers = async (): Promise<User[]> => {
    try {
        const resp = await fetch("http://localhost:3000/api/v1/auth/", {
            headers: {
                "Content-Type": "application/json"
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