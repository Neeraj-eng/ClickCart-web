import { createContext, useState, useEffect } from "react";

const authContext = createContext({
    isAuth : false
})

export const AuthProvider = ({children}) => {
    const [isAuth,setisAuth] = useState(false)

    const checkAuth = async () => {
          try {
            const res = await API.get("/isAuth");
            setisAuth(res.data.isAuth);
            console.log(res.data)
          } catch (err) {
            setisAuth(false);
          }
      };
    
    useEffect(()=>{
        checkAuth();
    },[])

    return(
        <authContext.Provider value={{isAuth,setisAuth}}>
        {children}
        </authContext.Provider>
    )
}

export default authContext;