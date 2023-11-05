import { createContext } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [admin, setAdmin] = useState(null);
  const [expire, setExpire] = useState("");
  const [news, setNews] = useState([]);
  const [singleNews, setSingleNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
  }, []);
  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setName(decoded.name);
      setUserId(decoded.userId);
      setAdmin(decoded.isAdmin);
      setExpire(decoded.exp);
    } catch (error) {
      console.log(error);
    }
  };

  const axiosInterceptor = axios.create();

  axiosInterceptor.interceptors.request.use(
    //interceptor (in axios) helps to update the token automatically when the token is expired
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwtDecode(response.data.accessToken);
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
          position: "bottom-center",
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
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const createNews = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("desc", data.desc);
    formData.append("catId", data.catId);
    formData.append("userId", userId);
    formData.append("file", data.file);
    try {
      const res = await axiosInterceptor.post(
        "http://lochalhost:3000/api/news",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.msg, {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      navigate("/view-news");
    } catch (error) {
      console.log(error);
    }
  };

  const handleNews = async () => {
    try {
      const res = await axiosInterceptor.get(`http://localhost:3000/api/news`, {
        Headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setNews(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNews = async (id) => {
    try {
      const res = await axiosInterceptor.delete(
        `http://localhost:3000/api/news/${id}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      toast.success(res.data.msg, {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      handleNews();
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleNews = async (id) => {
    try {
      const res = axiosInterceptor.get(`http://localhost:3000/api/news/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setSingleNews(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        error,
        getAllUsers,
        axiosInterceptor,
        token,
        createNews,
        news,
        handleNews,
        deleteNews,
        getSingleNews,
        singleNews,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};