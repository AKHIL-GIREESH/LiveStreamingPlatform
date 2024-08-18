import React from "react"

export type WrapperProps = {
    children: React.ReactNode
}

export type UserItemProps = {
    id: string,
    username: string,
    isLive?: boolean
}