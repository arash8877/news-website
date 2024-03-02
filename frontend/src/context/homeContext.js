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
  VIDEO_REQUEST,
  VIDEO_SUCCESS,
  VIDEO_FAIL,
} from "./constants/videoConstants";
import {
  LAST_NEWS_REQUEST,
  LAST_NEWS_SUCCESS,
  LAST_NEWS_FAIL,
} from "./constants/lastNewsConstants";
import {
  CATEGORY_POST_REQUEST,
  CATEGORY_POST_SUCCESS,
  CATEGORY_POST_FAIL,
} from "./constants/categoryConstants";
import { popularNewsReducer } from "./reducer/popularReducer";
import {
  POPULAR_NEWS_REQUEST,
  POPULAR_NEWS_SUCCESS,
  POPULAR_NEWS_FAIL,
} from "./constants/popularConstants";

//-------------------------INITIAL_STATE-----------------------------

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

const INITIAL_STATE_POPULAR_NEWS = {
  loading: true,
  error: "",
  popularNews: [],
};

//--------------------------------------------------HomeContextProvider----------------------------------------------------

export const HomeContext = createContext();

export const HomeContextProvider = ({ children }) => {
  const [category, setCategory] = useState([]);
  const [newsComment, setNewsComment] = useState([]);


  //------------------------------------------------------------------------
  const [state, dispatch] = useReducer(videoReducer, INITIAL_STATE_VIDEO);
  const [stateLastNews, lastNewsDispatch] = useReducer(
    lastNewsReducer,
    INITIAL_STATE_LAST_NEWS
  );
  const [stateCategory, categoryDispatch] = useReducer(
    categoryReducer,
    INITIAL_STATE_CATEGORY
  );

  const [statePopularNews, popularNewsDispatch] = useReducer(
    popularNewsReducer,
    INITIAL_STATE_POPULAR_NEWS
  );
//-------------------------------------------------------------------------
  useEffect(() => {
    LoadVideo();
    LoadLastNews();
    LoadCategory();
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

  //---------------------------LoadPopularNews-----------------------------------
  const LoadPopularNews = async () => {
    try {
      popularNewsDispatch({ type: POPULAR_NEWS_REQUEST });
      const { data } = await axios.get(`${baseUrl}/api/news/popular`);
      popularNewsDispatch({ type: POPULAR_NEWS_SUCCESS, payload: data });
    } catch (error) {
      popularNewsDispatch({
        type: POPULAR_NEWS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  //----------------------------------Comment----------------------------------------
  const createComment = async(data) => {
    try {
      const res = await axios.post(`${baseUrl}/api/comment`, data)
      toast.success(res.data, {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
}

const getSingleComment = async(id) => {
  try {
   const res = await axios.get(`${baseUrl}/api/comment/${id}`)
   setNewsComment(res.data)
  } catch (error) {
    console.log(error);
  }
 }

 

   //--------------------------------------------------------------------------


    //--------------------------------------------------------------------------


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
        loadingPopular: statePopularNews.loading,
        errorPopular: statePopularNews.error,
        popularNews: statePopularNews.popularNews,
        category,
        LoadCatPost,
        createComment,
        getSingleComment,
        newsComment,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
