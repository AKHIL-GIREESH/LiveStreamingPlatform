import DBSidebar from "./DBSidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {

    return (
        <div className="flex">
            <DBSidebar />
            <div className="h-[100vh] w-[85vw] border border-purple-400">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
