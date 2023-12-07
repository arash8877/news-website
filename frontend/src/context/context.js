import { createContext, useReducer } from "react";
import { reducerVideo } from "./reducer/videoReducer";
import { VIDEO_REQUEST } from "./constants/videoConstants";


export const HomeContext = createContext();

// reducer or useReducer help managing/interact with an api.


export const HomeContextProvider = ({Children}) => {

    const INITIAL_STATE = {
        loading: true,
        error: "",
        videos: [],
    }

    const [state, dispatch] = useReducer(reducerVideo, INITIAL_STATE);

    const loadVideo = async() => {
        try {
            dispatch({type: VIDEO_REQUEST})
        } catch (error) {
            console.log(error);
        }
    }


    return(
        <HomeContext.Provider value=''>
            {Children}
        </HomeContext.Provider>
    )
}