import React, { createContext, useState, useContext, useEffect,useMemo } from "react";
import Cookies from "js-cookie"
import { useQuery} from "@tanstack/react-query";
import {User,UserContextType,UserCookie} from "@/types/User"
import { getUser } from "./API/getUser";

const AuthContext = createContext<null | UserContextType>(null);

export default function AuthProvider({ children }:React.PropsWithChildren){
  const [user, setUser] = useState<null | User>(null);

  //const queryClient = useQueryClient()

  console.log("State :",user,setUser)

  //const queryClient = useQueryClient()

    const {data,isLoading} = useQuery({
    queryKey:["User"],
    queryFn: async () => {
        const theUser = await getUser()
        console.log(theUser)
        return theUser
    }
  })
  // console.log("userfunc",userFunc)

  // if(error){
  //   navi("/", { replace: true });
  // }

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  const UserContext = useMemo(() => ({
    user: user,
    update: setUser,
  }), [user]);

  if(isLoading){
    return(<h1>Loading...</h1>)
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

// export const useGetUser = () => {

//   console.log("Check")
  
//   const {data,error,isFetching} = useQuery({
//     queryKey:["User"],
//     queryFn: getUser
//   })

//   while(isFetching){
//     console.log("Fetching...")
//   }
//   if(error){
//     throw new Error("Unable to fetch User for some reason")
//   }else{
//     console.log(data)
//     return data
//   }

// }