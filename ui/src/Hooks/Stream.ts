//import { useUser } from "@/AuthProvider"
import { getUserStream } from "@/API/getUserStream"
import { User } from "@/types/User"
import { useQuery } from "@tanstack/react-query"

export const useStream = (user: User | null) => {
    return useQuery(
        {
            queryKey: ['stream', "User"],
            queryFn: async () => {
                console.log(user)
                if (user)

                    return await getUserStream(user._id)
            },
            enabled: !!user
        }
    )
}
