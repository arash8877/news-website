import { createContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const login = async (inputs) => {
    try {
        const res = await axios.post("http://localhost:5000/api/users/login", inputs);
        console.log(res)
    } catch (error) {
      console.log(error);
    }
  };


  return <AuthContext.Provider value={{login}}>{children}</AuthContext.Provider>;
};
