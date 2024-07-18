import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({});
export function UserContextProvider({children}) {
    const [userInfo, setUserInfo] = useState({})
    const apiUrl = 'http://localhost:4000'
    return(
        <UserContext.Provider value={{userInfo, setUserInfo, apiUrl}}>
            {children}
        </UserContext.Provider>
    )
}
