export type UserLogin = {
    email: string,
    password: string
}

export type User = {
    _id: string,
    username: string,
    email: string,
    following: string[],
    followers: string[]
}

export type UserContextType = {
    user: User | null,
    update: (user: User | null) => void
}

export type UserCookie = {
    data: User,
    token: string
}