import { LAST_NEWS_FAIL, LAST_NEWS_REQUEST, LAST_NEWS_SUCCESS} from "../constants/lastNewsConstants";


export const lastNewsReducer = (state = {lastNews: []}, action) => {
    switch (action.type) {
        case LAST_NEWS_REQUEST:
          return { loading: true, lastNews: [] };
        case LAST_NEWS_SUCCESS:
          return { loading: false, lastNews: action.payload };
        case LAST_NEWS_FAIL:
          return { loading: false, error: action.payload };
        default:
          return state;
      }

}