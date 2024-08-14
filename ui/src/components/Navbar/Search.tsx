import React, { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { SearchIcon,X } from "lucide-react"
import { useNavigate } from "react-router"

const Search = () => {

    const [value,setValue] = useState<string>("")
    const navigate = useNavigate()

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(value.length <3) return;

        navigate(`/search/?term=${value}`)
         
    }


    return(
        <div>
            <form onSubmit={onSubmit}>
                <Input placeholder="search"
                value={value} onChange={(e) => setValue(e.target.value)}/>
                <Button type="submit" >
                    {value && <X onClick={() => setValue("")}/>}
                    <SearchIcon/>
                </Button>
            </form>
        </div>
    )
}

export default Search