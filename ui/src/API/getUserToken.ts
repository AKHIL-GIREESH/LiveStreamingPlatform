import Cookies from "js-cookie"

export const getUserToken = async (id: string) => {
    try {
        let token
        token = Cookies.get("token")
        if (!token) {
            token = "NoToken"
        }
        const response = await fetch(`http://localhost:3000/api/v1/stream/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })

        const respJSON = await response.json()
        console.log(respJSON)
        return respJSON.token

    } catch (err) {
        throw new Error("Something went wrong: " + err)
    }

}