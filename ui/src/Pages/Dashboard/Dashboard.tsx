import DBSidebar from "./DBSidebar";
import { Outlet } from "react-router-dom";
import { useStream } from "@/Hooks/Stream";
import { useUser } from "@/AuthProvider";

const Dashboard = () => {
    
    const user = useUser()

    const { data, isLoading, error } = useStream(user);

    if(!user){
        return(<p>Login</p>)
    }

    if(error){
        return(<p>Try again</p>)
    }

    return (
        <div className="flex">
            <DBSidebar />
            {isLoading && <p>Loading...</p>}
            {data && 
            <div className="h-[100vh] w-[85vw] border border-purple-400">
                <Outlet />
            </div>}
        </div>
    );
};

export default Dashboard;
