import { createContext, useReducer } from "react";
import { reducerVideo } from "./reducer/reducerVideo";


export const HomeContext = createContext();


export const HomeContextProvider = ({Children}) => {

    const INITIAL_STATE = {
        loading: true,
        error: "",
        videos: [],
    }

    const [state, dispatch] = useReducer(reducerVideo, INITIAL_STATE);


    return(
        <HomeContext.Provider value=''>
            {Children}
        </HomeContext.Provider>
    )
}