import { createContext, useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { videoReducer } from "./reducer/videoReducer";
import { lastNewsReducer } from "./reducer/lastNewsReducer";
import { categoryReducer } from "./reducer/categoryReducer";
import { baseUrl } from "../utils/baseUrl";
import axios from "axios";
import { useLocation } from "react-router-dom";
//------------------------------------------------------------------
import {
  VIDEO_FAIL,
  VIDEO_REQUEST,
  VIDEO_SUCCESS,
} from "./constants/videoConstants";
import {
  LAST_NEWS_FAIL,
  LAST_NEWS_REQUEST,
  LAST_NEWS_SUCCESS,
} from "./constants/lastNewsConstants";
import {
  CATEGORY_POST_REQUEST,
  CATEGORY_POST_SUCCESS,
  CATEGORY_POST_FAIL,
} from "./constants/categoryConstants";

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

const INITIAL_STATE_CATEGORY = {
  loading: true,
  error: "",
  news: [],
};

//--------------------------------------------------HomeContextProvider----------------------------------------------------

export const HomeContext = createContext();

export const HomeContextProvider = ({ children }) => {
  const [category, setCategory] = useState([]);
  const [state, dispatch] = useReducer(videoReducer, INITIAL_STATE_VIDEO);
  const [stateLastNews, lastNewsDispatch] = useReducer(
    lastNewsReducer,
    INITIAL_STATE_LAST_NEWS
  );
  const [stateCategory, categoryDispatch] = useReducer(
    categoryReducer,
    INITIAL_STATE_CATEGORY
  );

  useEffect(() => {
    LoadVideo();
    LoadLastNews();
    LoadCategory();
    LoadCatPost();
  }, []);

  //---------------------------------LoadVideo-------------------------------
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
  //---------------------------------LoadLastNews-----------------------------
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

  //---------------------------------LoadCategory-----------------------------
  const LoadCategory = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/category/home`);
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const cat = useLocation().search;

  const LoadCatPost = async () => {
    try {
      categoryDispatch({ type: CATEGORY_POST_REQUEST });
      const { data } = await axios.get(`${baseUrl}/api/news/cat-news${cat}`);
      categoryDispatch({ type: CATEGORY_POST_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      categoryDispatch({
        type: CATEGORY_POST_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  //--------------------------------------------------------------

  //--------------------------------------------------------------------------

  return (
    <HomeContext.Provider
      value={{
        loading: state.loading,
        error: state.error,
        videos: state.videos,
        loadingLastNews: stateLastNews.loading,
        errorLastNews: stateLastNews.error,
        lastNews: stateLastNews.lastNews,
        loadingCategory: stateCategory.loading,
        errorCategory: stateCategory.error,
        newsCategory: stateCategory.news, 
        category

      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
