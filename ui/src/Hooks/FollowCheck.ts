import { useUser } from "@/AuthProvider"

export const useFollowCheck = (id: string): boolean | null => {
    let condition: boolean | null = false
    const user = useUser()
    if (user !== null) {
        for (let i = 0; i < user.following.length; i++) {
            if (id === user.following[i]) {
                condition = true
                break
            }
        }
    } else {
        condition = null
    }

    return condition
}