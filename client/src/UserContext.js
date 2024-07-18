import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({});
export function UserContextProvider({children}) {
    const [userInfo, setUserInfo] = useState({})
    const apiUrl = 'https://blog-api-xjpe.onrender.com'
    return(
        <UserContext.Provider value={{userInfo, setUserInfo, apiUrl}}>
            {children}
        </UserContext.Provider>
    )
}
