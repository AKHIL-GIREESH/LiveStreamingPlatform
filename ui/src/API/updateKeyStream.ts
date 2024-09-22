import { Stream } from "@/types/Stream"
import Cookies from "js-cookie"

export const updateKeyStream = async (id: string): Promise<Stream> => {
    try {
        const token = Cookies.get("token")
        if (!token) {
            throw new Error("No Token")
        }
        const response = await fetch(`http://localhost:3000/api/v1/stream/${id}/ingress`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({ ingress: "RTMP" })
            })

        const respJSON = await response.json();
        console.log(respJSON)
        return respJSON.stream

    } catch (e) {
        throw new Error("Error = " + e)
    }
}