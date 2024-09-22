import { createContext,useState,useMemo, useContext, useEffect } from "react";
import { Stream, StreamContextType } from "./types/Stream";
import { useUser } from "./AuthProvider";
import { useStream } from "./Hooks/Stream";

const StreamContext = createContext<null | StreamContextType>(null);

export default function StreamProvider({ children }:React.PropsWithChildren){
    const [stream, setStream] = useState<null | Stream>(null);

    const user = useUser()

    const { data, isLoading, error } = useStream(user);

    console.log("InsideStreamContextProvider")

    useEffect(() => {
        if(data){
            setStream(data)
        }
    },[data])

    const StContext = useMemo(() => ({
        stream:stream,
        update:setStream
    }), [stream]);

    if(!user){
        return(<p>Login</p>)
    }

    if(error){
        return(<p>Try again</p>)
    }

    if(isLoading){
        return(<p>Loading...</p>)
    }

    return(
        <StreamContext.Provider value={StContext}>
            {children}
        </StreamContext.Provider>
    )
}

export const useGetStream = () : Stream | null => {
    const context = useContext(StreamContext)

    if(context === null){
        return null
    }
    return context.stream
}

export const useSetStream = () => {
    const context = useContext(StreamContext);

    console.log(context)

    if(context === null){
        throw new Error("Not initialised")
    }
    
    const setStream = (data:Stream) => {
        const {update} = context
        if (data !== undefined) {
        //throw new Error("Provide stream");
        update(data);
        }
    };

    return setStream;
}