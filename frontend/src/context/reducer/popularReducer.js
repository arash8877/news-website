import { POPULAR_NEWS_FAIL, POPULAR_NEWS_REQUEST, POPULAR_NEWS_SUCCESS } from "../constants/popularConstants";

   
   export const popularNewsReducer = (state = { popularNews: [] }, action) => {
     switch (action.type) {
       case POPULAR_NEWS_REQUEST:
         return { loading: true, popularNews: [] };
       case POPULAR_NEWS_SUCCESS:
         return { loading: false, popularNews: action.payload };
       case POPULAR_NEWS_FAIL:
         return { loading: false, error: action.payload };
       default:
         return state;
     }
   };