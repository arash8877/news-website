import { createContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import { videoReducer } from "./reducer/videoReducer";

export const HomeContext = createContext();

const INITIAL_STATE = {
  loading: true,
  error: "",
  videos: []
}

export const HomeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoReducer, INITIAL_STATE );

  return <HomeContext.Provider value="">{children}</HomeContext.Provider>;
};
