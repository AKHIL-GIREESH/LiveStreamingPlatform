export type Stream = { name: string, thumbnailURL: string, isLive: boolean, isChatEnabled: boolean, isChatDelayed: boolean, isChatFollowersOnly: boolean }

export type StreamContextType = {
    stream: Stream | null,
    update: (stream: Stream | null) => void
}