import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [admin, setAdmin] = useState(null);
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const res = await axios.get("http://localhost:5000/token");
      setToken(res.data.accessToken);
      const decoded = jwtDecode(res.data.accessToken);
      setName(decoded.name);
      setUserId(decoded.userId);
      setAdmin(decoded.isAdmin);
      setExpire(decoded.exp);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (inputs) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        inputs
      );

      if (res.data.error) {
        setError(res.data.error);
      } else {
        navigate("/dashboard");
        toast.success(res.data.msg, {
          position: "top-center",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
        });
        setName(res.data.name);
        setUserId(res.data.userId);
        setToken(res.data.accessToken);
        setAdmin(res.data.isAdmin);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //interceptor (in axios) helps to update the token automatically when the token is expired
  const axiosInterceptor = axios.create();

  axiosInterceptor.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        //expire*1000 to convert expire to millisecond
        const res = await axios.get("http://localhost:5000/token"); //expire * 1000 < currentDate.getTime() ==>
        config.headers.Authorization = `Bearer ${res.data.accessToken}`; // to check if the token is expired
        setToken(res.data.accessToken);
        const decoded = jwtDecode(res.data.accessToken);
        setName(decoded.name);
        setUserId(decoded.userId);
        setAdmin(decoded.isAdmin);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );



  const getAllUsers = async () => {
    try {
      const res = await axiosInterceptor.get(
        "http://localhost:5000/api/users",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("getAllusers", res);
    } catch (error) {
      console.log(error);
    }
  };








  return (
    <AuthContext.Provider value={{ login, error, getAllUsers }}>
      {children}
    </AuthContext.Provider>
  );
};






