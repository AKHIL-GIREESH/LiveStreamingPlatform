import { UserLogin, User } from "@/types/User"

export const LoginAPI = async (loginData: UserLogin) => {
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
        const data: User = { _id: respJSON._id, username: respJSON.username, email: respJSON.email }
        return data
    } catch (e) {
        console.log(e)
    }

}