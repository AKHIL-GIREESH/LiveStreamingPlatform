import { useState } from "react"

const SignUp = () => {
    
    // const [SignUpData,setSignUpData] = useState({
    //     username:"",
    //     email:"",
    //     password:""
    // })
    // const signUpFunc = (e) => {
    //     const {name,value} = e.target
    //     setSignUpData(prev => ({...prev,[name]:value}))
    // }

    // return(
    // <div>
    //     <h1>SIGNUP</h1>
    //     <div>
    //         <input className="border-2 border-black  m-1" type="text" name="username" value={SignUpData.username} onChange={(e) => updateCred(e)}/>
    //         <input className="border-2 border-black  m-1" type="text" name="email" value={SignUpData.email} onChange={(e) => updateCred(e)}/>
    //         <input className="border-2 border-black  m-1" type="text" name="password" value={SignUpData.password} onChange={(e) => updateCred(e)}/>
    //         {/* <Button>Login</Button> */}
    //         {error?<button className="bg-black p-1 text-white" onClick={signUpFunc}>{isPending?"Loading":"Login"}</button>:<button className="bg-black p-1 text-white" onClick={signUpFunc}>{isPending?"Loading":"Login"}</button>}
    //     </div>
    // </div>)
    return(
        <h1>SIGNUP</h1>
    )
}

export default SignUp