import { useParams } from "react-router"

const StreamerPg = () => {
    const {id} = useParams()
    console.log(id)
    return(
        <div>
            {id}
        </div>
    )
}

export default StreamerPg