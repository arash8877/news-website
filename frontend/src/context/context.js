import { createContext, useReducer, useEffect, useState } from "react";
import { videoReducer } from "./reducers/videoReducer";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import { lastNewsReducer } from "./reducers/lastNewsReducer";
import { popularNewsReducer } from "./reducers/popularNewsReducer";
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
import {
  POPULAR_NEWS_REQUEST,
  POPULAR_NEWS_SUCCESS,
  POPULAR_NEWS_FAIL,
} from "./constants/popularNewsConstants";
import { catPostReducer } from "./reducers/categoryReducer";
import { useLocation } from "react-router-dom";

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
  const INITIAL_STATE_CAT_POST = {
    loading: true,
    error: "",
    news: [],
  };
  const INITIAL_STATE_POPULAR_NEWS = {
    loading: true,
    error: "",
    popularNews: [],
  };


  const [state, dispatch] = useReducer(videoReducer, INITIAL_STATE);
  const [stateLastNews, lastNewsDispatch] = useReducer(
    lastNewsReducer,
    INITIAL_STATE_LAST_NEWS
  );
  const [stateCatPost, catPostDispatch] = useReducer(
    catPostReducer,
    INITIAL_STATE_CAT_POST
  );
  const [statePopularNews, popularNewsDispatch] = useReducer(
    popularNewsReducer,
    INITIAL_STATE_POPULAR_NEWS
  );
  const [category, setCategory] = useState([]);
  const cat = useLocation().search


  useEffect(() => {
    loadVideo();
    loadLastNews();
    loadCategory();
    loadCatPost();
    loadPopularNews();
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

  const loadCatPost = async () => {
    try {
      catPostDispatch({ type: CATEGORY_POST_REQUEST });
      const { data } = await axios.get(`${baseUrl}/api/news/cat-news`);
      catPostDispatch({ type: CATEGORY_POST_SUCCESS, payload: data });
    } catch (error) {
      lastNewsDispatch({
        type: CATEGORY_POST_FAIL,
        payload: error.response.data.message,
      });
      console.log(error);
    }
  };

  const loadCategory = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/category/home`);
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadPopularNews = async () => {
    try {
      popularNewsDispatch({ type: POPULAR_NEWS_REQUEST });
      const { data } = await axios.get(`${baseUrl}/api/news/popular`);
      popularNewsDispatch({ type: POPULAR_NEWS_SUCCESS, payload: data });
    } catch (error) {
      lastNewsDispatch({
        type: POPULAR_NEWS_FAIL,
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
        loadingCatPost: stateCatPost,
        errorCatPst: stateCatPost.error,
        loadingPopularNews: statePopularNews.loading,
        errorPopularNews: statePopularNews.error,
        popularNews: statePopularNews.popularNews,
        news: stateCatPost.news,
        category,
      }}
    >
      {Children}
    </HomeContext.Provider>
  );
};
