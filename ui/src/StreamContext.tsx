import { createContext,useState,useMemo, useContext } from "react";
import { Stream, StreamContextType } from "./types/Stream";

const StreamContext = createContext<null | StreamContextType>(null);

export default function StreamProvider({ children }:React.PropsWithChildren){
    const [stream, setStream] = useState<null | Stream>(null);

    const StContext = useMemo(() => ({
        stream:stream,
        update:setStream
    }), [stream]);

    return(
        <StreamContext.Provider value={StContext}>
            {children}
        </StreamContext.Provider>
    )
}

export const useGetStream = () => {
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
        if (data === undefined) {
        throw new Error("Provide stream");
        }
        update(data);
    };

    return setStream;
}