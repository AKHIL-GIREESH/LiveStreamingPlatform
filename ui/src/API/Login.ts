import { UserLogin, User, UserCookie } from "@/types/User"

export const LoginAPI = async (loginData: UserLogin): Promise<UserCookie> => {
    try {
        console.log("Check1")
        console.log(JSON.stringify(loginData))
        const response = await fetch("http://localhost:3000/api/v1/auth/login", {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
                "Content-Type": "application/json",
            },
        })

        const respJSON = await response.json();
        console.log(respJSON)
        const { token, user } = respJSON
        const data: User = { _id: user._id, username: user.username, email: user.email, followers: user.followers, following: user.following, isLive: user.isLive }
        return { data, token: `Bearer ${token}` }
    } catch (e) {
        throw new Error("Failed to login, " + e);
    }

}