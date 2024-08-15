import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {User,UserContextType,UserCookie} from "@/types/User"

const AuthContext = createContext<null | UserContextType>(null);

export default function AuthProvider({ children }:React.PropsWithChildren){
  const [user, setUser] = useState<null | User>(null);
  //const queryClient = useQueryClient()

  console.log("State :",user,setUser)

  console.log("hi",user)

  let UserContext:UserContextType = {
    user:user,
    update:setUser
  }

  return (
    <AuthContext.Provider value={UserContext}>
      {children}
    </AuthContext.Provider>
  );
};


export const useSetAuth = () => {
  
  const context = useContext(AuthContext);

  console.log(context)

  if(context === null){
    throw new Error("Not initialised")
  }
  
  const setAuth = ({ data, token }:UserCookie) => {
    const {update} = context
    if (data === undefined) {
      throw new Error("Provide user");
    }
    update(data);
    Cookies.set("token", token, { expires: 30 });
  };

  return setAuth;
};

export const useUser = () => {
  const context = useContext(AuthContext)
  if(context === null){
    return null
  }else{
    const {user} = context
    console.log(context)
    return user
  }
}

export const useGetUser = () => {
  const token = Cookies.get("token")
  console.log(token)

  // const user = useQuery({
  //   queryKey:["User"],
  //   queryFn: 
  // })
}