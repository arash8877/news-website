import { createContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const login = async (inputs) => {
    try {
      console.log(inputs);
    } catch (error) {
      console.log(error);
    }
  };


  return <AuthContext.Provider value={{login}}>{children}</AuthContext.Provider>;
};
