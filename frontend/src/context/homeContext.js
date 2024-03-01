import { createContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import { videoReducer } from "./reducer/videoReducer";
import { lastNewsReducer } from "./reducer/lastNewsReducer";
import { baseUrl } from "../utils/baseUrl";
import axios from "axios";
import {
  VIDEO_FAIL,
  VIDEO_REQUEST,
  VIDEO_SUCCESS,
} from "./constants/videoConstants";
import { LAST_NEWS_FAIL, LAST_NEWS_REQUEST, LAST_NEWS_SUCCESS } from "./constants/lastNewsConstants";

const INITIAL_STATE_VIDEO = {
  loading: true,
  error: "",
  videos: [],
};

const INITIAL_STATE_LAST_NEWS = {
  loading: true,
  error: "",
  lastNews: [],
};

export const HomeContext = createContext();

export const HomeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoReducer, INITIAL_STATE_VIDEO);
  const [stateLastNews, lastNewsDispatch] = useReducer(lastNewsReducer, INITIAL_STATE_LAST_NEWS);

  useEffect(() => {
    LoadVideo();
  }, []);


  //---------------------------------LoadVideo-----------------------------------
  const LoadVideo = async () => {
    try {
      dispatch({ type: VIDEO_REQUEST });
      const { data } = await axios.get(`${baseUrl}/api/single-video`);
      dispatch({ type: VIDEO_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: VIDEO_FAIL, payload: error.response.data.message });
    }
  };
//---------------------------------LoadLastNews-----------------------------------
  const LoadLastNews = async () => {
    try {
      lastNewsDispatch({ type: LAST_NEWS_REQUEST });
      const { data } = await axios.get(`${baseUrl}/api/news/last-news`);
      lastNewsDispatch({ type: LAST_NEWS_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      lastNewsDispatch({
        type: LAST_NEWS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//-----------------------------------------------------------------------------






  return (
    <HomeContext.Provider
      value={{
        loading: state.loading,
        error: state.error,
        videos: state.videos,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
