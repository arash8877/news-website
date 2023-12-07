import { createContext, useReducer } from "react";
import { reducerVideo } from "./reducer/videoReducer";
import { VIDEO_FAIL, VIDEO_REQUEST, VIDEO_SUCCESS } from "./constants/videoConstants";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";

export const HomeContext = createContext();

// reducer or useReducer help managing/interact with an api.

export const HomeContextProvider = ({ Children }) => {
  const INITIAL_STATE = {
    loading: true,
    error: "",
    videos: [],
  };

  const [state, dispatch] = useReducer(reducerVideo, INITIAL_STATE);

  const loadVideo = async () => {
    try {
      dispatch({ type: VIDEO_REQUEST });
      const {data} = await axios.get(`${baseUrl}/api/single-video`);
      dispatch({ type: VIDEO_SUCCESS, payload: data });
    } catch (error) {
      dispatch({type: VIDEO_FAIL, payload: error.response.data.message});
    }
  };

  return <HomeContext.Provider value="">{Children}</HomeContext.Provider>;
};
