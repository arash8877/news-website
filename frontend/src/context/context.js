import { createContext, useReducer, useEffect } from "react";
import { videoReducer } from "./reducers/videoReducer";
import {
  VIDEO_FAIL,
  VIDEO_REQUEST,
  VIDEO_SUCCESS,
} from "./constants/videoConstants";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import { lastNewsReducer } from "./reducers/lastNewsReducer";
import {
  LAST_NEWS_FAIL,
  LAST_NEWS_REQUEST,
  LAST_NEWS_SUCCESS,
} from "./constants/lastNewsConstants";

export const HomeContext = createContext();

// reducer or useReducer help managing/interact with an api.

export const HomeContextProvider = ({ Children }) => {
  const INITIAL_STATE = {
    loading: true,
    error: "",
    videos: [],
  };
  const INITIAL_STATE_LAST_NEWS = {
    loading: true,
    error: "",
    lastNews: [],
  };

  const [state, dispatch] = useReducer(videoReducer, INITIAL_STATE);
  const [stateLastNews, lastNewsDispatch] = useReducer(
    lastNewsReducer,
    INITIAL_STATE_LAST_NEWS
  );

  useEffect(() => {
    loadVideo();
    loadLastNews();
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

  const loadCategories = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/category/home`)
    } catch (error) {
      console.log(error);
    }
  }




  return (
    <HomeContext.Provider
      value={{
        loading: state.loading,
        error: state.error,
        videos: state.videos,
        loadingLastNews: stateLastNews.loading,
        errorLastNews: stateLastNews.error,
        lastNews: stateLastNews.lastNews
      }}
    >
      {Children}
    </HomeContext.Provider>
  );
};