import { useState, useEffect } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode"
import { useQuery } from "@tanstack/react-query"
import { getUserToken } from "@/API/getUserToken";

export const useViewerToken = (hostIdentity: string) => {
    const [token, setToken] = useState("")
    const [name, setName] = useState("")
    const [identity, setIdentity] = useState("")

    useEffect(() => {
        const createToken = async () => {
            const viewerToken = await getUserToken(hostIdentity);
            setToken(viewerToken);

            const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
                name?: string;
            };
            const name = decodedToken?.name;
            const identity = decodedToken?.jti;

            if (identity) {
                setIdentity(identity);
            }
            if (name) {
                setName(name);
            }
        }
        createToken()
    }, [hostIdentity])

    return { name, token, identity }
}