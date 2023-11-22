import { createContext } from "react";


export const HomeContext = createContext();


export const HomeContextProvider = ({Children}) => {
    return(
        <HomeContext.Provider value=''>
            {Children}
        </HomeContext.Provider>
    )
}