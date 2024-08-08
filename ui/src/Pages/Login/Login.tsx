import { useState } from "react"
import { UserLogin } from "@/types/User"
//import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { LoginAPI } from "@/API/Login"
//import {useSetAuth} from "@/"


const Login = () => {

    const [loginData,setLoginData] = useState<UserLogin>({
        email:"",
        password:""
    })

    //useSetAuth

    const updateCred = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target
        setLoginData((prev:UserLogin) => ({...prev,[name]:value}))
    }

    const {mutate:loginUser,isPending,error} = useMutation({
        mutationFn: async () => { 
            await LoginAPI(loginData)
            console.log("Works")

        }
    })

    const loginFunc = () => {
        loginUser()
    }

    return(
    <div>
        <h1>LOGIN</h1>
        <div>
            <input className="border-2 border-black  m-1" type="text" name="email" value={loginData.email} onChange={(e) => updateCred(e)}/>
            <input className="border-2 border-black  m-1" type="text" name="password" value={loginData.password} onChange={(e) => updateCred(e)}/>
            {/* <Button>Login</Button> */}
            {error?<button className="bg-black p-1 text-white" onClick={loginFunc}>{isPending?"Loading":"Login"}</button>:<button className="bg-black p-1 text-white" onClick={loginFunc}>{isPending?"Loading":"Login"}</button>}
        </div>
    </div>)
}

export default Login