import { Button } from "../ui/button"
import { Link } from "react-router-dom"

const DashboardButton = () => {
    return(
        <Button>
            <Link to="/me/Dashboard">
                Dashboard
            </Link>
        </Button>
    )
}

export default DashboardButton