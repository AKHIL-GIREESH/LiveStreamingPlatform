import { UserLogin } from "@/types/User"

export const LoginAPI = async (loginData: UserLogin) => {
    try {
        const response = await fetch("http://localhost:3000/api/v1/auth/login", {
            method: "POST",
            body: JSON.stringify({ loginData }),
            headers: {
                "Content-Type": "application/json",
            },
        })

        const respJSON = await response.json();
        console.log(respJSON.data)
        return respJSON.data;
    } catch (e) {
        console.log(e)
    }

}