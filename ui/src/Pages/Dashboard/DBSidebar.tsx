import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const DBSidebar = () => {
    return(
        <div className="h-[100vh] border border-black w-[15vw] flex flex-col">
            <Button>
                <Link to="./stream">
                    Stream
                </Link>
            </Button>
            <Button>
                <Link to="./chat">
                    Chat
                </Link>
            </Button>
        </div>
    )
}

export default DBSidebar