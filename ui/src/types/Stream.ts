export type Stream = { name: string, thumbnailURL: string, isChatEnabled: boolean, isChatDelayed: boolean, isChatFollowersOnly: boolean, ingressID?: string, serverURL?: string, streamKey?: string }

export type StreamContextType = {
    stream: Stream | null,
    update: (stream: Stream | null) => void
}

export type StreamChat = {
    isChatEnabled?: boolean,
    isChatDelayed?: boolean,
    isChatFollowersOnly?: boolean
}