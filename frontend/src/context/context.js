import { createContext, useReducer } from "react";


export const HomeContext = createContext();


export const HomeContextProvider = ({Children}) => {

    const [state, dispatch] = useReducer();


    return(
        <HomeContext.Provider value=''>
            {Children}
        </HomeContext.Provider>
    )
}