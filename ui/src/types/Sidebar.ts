import React from "react"
import { User } from "./User"

export type WrapperProps = {
    children: React.ReactNode
}

export type UserItemProps = {
    id: string,
    username: string
}