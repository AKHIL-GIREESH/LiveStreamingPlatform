import { useState, useEffect } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode"

export const useViewerToken = (hostIdentity: string) => {
    const [token, setToken] = useState("")
    const [name, setName] = useState("")
    const [identity, setIdentity] = useState("")

    useEffect(() => {
        const createToken = async () => {
            const viewerToken = null
        }
    }, [])
}