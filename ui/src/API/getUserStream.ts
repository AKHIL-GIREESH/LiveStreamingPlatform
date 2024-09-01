import { Stream } from "@/types/Stream"

export const getUserStream = async (id: string): Promise<Stream> => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/stream/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        const respJSON = await response.json()
        console.log(respJSON)
        return respJSON.stream

    } catch (e) {
        throw new Error("Something went wrong: " + e)
    }
}