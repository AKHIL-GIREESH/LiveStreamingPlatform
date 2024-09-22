import { Button } from "@/components/ui/button"

const Keys = () => {
    return(
    <>Keys<br/>
    <input className="border-2 border-black  m-1" type="text" disabled value={""}/>
    <input className="border-2 border-black  m-1" type="text" disabled value={""}/>
    <br/><br/>
    <Button onClick={() => console.log("Keys")}>Generate</Button>
    </>)
}

export default Keys