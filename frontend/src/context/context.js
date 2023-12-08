import { createContext, useReducer, useEffect } from "react";
import { videoReducer } from "./reducer/videoReducer";
import {
  VIDEO_FAIL,
  VIDEO_REQUEST,
  VIDEO_SUCCESS,
} from "./constants/videoConstants";
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

  const [state, dispatch] = useReducer(videoReducer, INITIAL_STATE);
  const [stateLastNews, lastNewsDispatch] = useReducer(
    lastNewsReducer,
    INITIAL_STATE_LAST_NEWS
  );

  useEffect(() => {
    loadVideo();
  }, []);

  const loadVideo = async () => {
    try {
      dispatch({ type: VIDEO_REQUEST });
      const { data } = await axios.get(`${baseUrl}/api/single-video`);
      dispatch({ type: VIDEO_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: VIDEO_FAIL, payload: error.response.data.message });
      console.log(error);
    }
  };

  const loadLastNews = async () => {
    try {
      lastNewsDispatch({ type: LAST_NEWS_REQUEST });
      const { data } = await axios.get(`${baseUrl}/api/news/lastnews`);
      lastNewsDispatch({ type: LAST_NEWS_SUCCESS, payload: data });
    } catch (error) {
      lastNewsDispatch({
        type: LAST_NEWS_FAIL,
        payload: error.response.data.message,
      });
      console.log(error);
    }
  };

  return (
    <HomeContext.Provider
      value={{
        loading: state.loading,
        error: state.error,
        videos: state.videos,
        loadingLastNews: stateLastNews.loading,
        errorLastNews: stateLastNews.error,
        lastNews: stateLastNews.lastNews,
      }}
    >
      {Children}
    </HomeContext.Provider>
  );
};
