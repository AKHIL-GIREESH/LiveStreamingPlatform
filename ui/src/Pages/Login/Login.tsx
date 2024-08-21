import { useState } from "react"
import { UserLogin } from "@/types/User"
//import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { LoginAPI } from "@/API/Login"
import { useSetAuth } from "@/AuthProvider"
import { useNavigate } from "react-router"
import Cookies from "js-cookie"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
//import {useSetAuth} from "@/"


const Login = () => {

    const [loginData,setLoginData] = useState<UserLogin>({
        email:"",
        password:""
    })

    const setAuth = useSetAuth()
    const navi = useNavigate()
    

    //useSetAuth

    const updateCred = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target
        setLoginData((prev:UserLogin) => ({...prev,[name]:value}))
    }

    const {mutate:loginUser,isPending,error} = useMutation({
        mutationFn: async () => { 
            const {data,token} = await LoginAPI(loginData)
            console.log("Works")
            setAuth(data)
            Cookies.set("token", token, { expires: 30 });
            navi("/", { replace: true });
        }
    })

    const loginFunc = () => {
        loginUser()
    }

    if(isPending){
        return(
            <Button disabled>
                Loading
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </Button>
        )
    }
    return(
    <div>
        <h1>LOGIN</h1>
        <div>
            <input className="border-2 border-black  m-1" type="text" name="email" value={loginData.email} onChange={(e) => updateCred(e)}/>
            <input className="border-2 border-black  m-1" type="text" name="password" value={loginData.password} onChange={(e) => updateCred(e)}/>
            {/* <Button>Login</Button> */}
            
            {/* {error?<button className="bg-black p-1 text-white" onClick={loginFunc}>{isPending?"Loading":"Login"}</button>:<button className="bg-black p-1 text-white" onClick={loginFunc}>{isPending?"Loading":"Login"}</button>} */}
            <Button onClick={loginFunc}>
                {error?"Try Again":"Login"}
            </Button>
        </div>
    </div>)
}

export default Login