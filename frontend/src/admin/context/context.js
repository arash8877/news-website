import { useState, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [error, setError] = useState("");
    const navigate = useNavigate();

  const login = async (inputs) => {
    try {
        const res = await axios.post("http://localhost:5000/api/users/login", inputs);

        if (res.data.error) {
            setError(res.data.error)
        } else {
           navigate("/dashboard")
        }
    } catch (error) {
      console.log(error);
    }
  };


  return <AuthContext.Provider value={{login}}>{children}</AuthContext.Provider>;
};
