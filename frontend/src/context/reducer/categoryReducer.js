import { CATEGORY_POST_REQUEST, CATEGORY_POST_SUCCESS, CATEGORY_POST_FAIL} from "../constants/categoryConstants"

export const categoryReducer = (state = { news: [] }, action) => {
     switch (action.type) {
       case CATEGORY_POST_REQUEST:
         return { loading: true, news: [] };
       case CATEGORY_POST_SUCCESS:
         return { loading: false, news: action.payload };
       case CATEGORY_POST_FAIL:
         return { loading: false, error: action.payload };
       default:
         return state;
     }
   };
   