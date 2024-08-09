import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {User,UserContextType,UserCookie} from "@/types/User"

const AuthContext = createContext<null | UserContextType>(null);

const AuthProvider = ({ children }:React.PropsWithChildren) => {
  const [user, setUser] = useState<null | User>(null);
  //const queryClient = useQueryClient()

  console.log("State :",user,setUser)

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
  
  const {user,update} = context
  const setAuth = ({ data, token }:UserCookie) => {
    if (data === undefined) {
      throw new Error("Provide user");
    }
    update(data);
    Cookies.set("token", token, { expires: 30 });
    console.log(user)
    
  };

  return setAuth;
};

export default AuthProvider