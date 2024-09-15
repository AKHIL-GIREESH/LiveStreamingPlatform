import { StreamChat } from "@/types/Stream"

export const updateStream = async (id: string, streamData: StreamChat) => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/stream/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(streamData)
            })

        const respJSON = await response.json();
        console.log(respJSON)


    } catch (e) {
        console.log("Error = " + e)
    }
}