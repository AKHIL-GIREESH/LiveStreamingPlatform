import { WrapperProps } from "@/types/Sidebar"

const Wrapper = ({children}:WrapperProps) => {
    return(
        <aside style={{height:"calc(100vh - 5rem)"}}className="border border-black w-[20vw]">
            {children}
        </aside>
    )
}

export default Wrapper