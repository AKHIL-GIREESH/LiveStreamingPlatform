import { useState, useEffect } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode"
import { useQuery } from "@tanstack/react-query"
import { getUserToken } from "@/API/getUserToken";
import Cookies from "js-cookie";

export const useViewerToken = (hostIdentity: string) => {
    const [token, setToken] = useState("")
    const [name, setName] = useState("")
    const [identity, setIdentity] = useState("")

    useEffect(() => {
        const createToken = async () => {
            const viewerToken = await getUserToken(hostIdentity);
            //Cookies.set("token", token, { expires: 30 });
            setToken(viewerToken);

            console.log(viewerToken)

            const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
                name?: string;
            };
            const name = decodedToken?.name;
            const identity = decodedToken?.sub;

            if (identity) {
                setIdentity(identity);
            }
            if (name) {
                setName(name);
            }

            console.log(decodedToken)
        }
        createToken()
    }, [hostIdentity])

    return { name, token, identity }
}