import { createContext } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { baseUrl } from "../../utils/baseUrl";

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
  const [category, setCategory] = useState([]);
  const [errorVideo, setErrorVideo] = useState("");
  const [allVideos, setAllVideos] = useState([]);
  const [registerError, setRegisterError] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
  }, []);
  const refreshToken = async () => {
    try {
      const response = await axios.get(`${baseUrl}/token`);
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
        const response = await axios.get(`${baseUrl}/token`);
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

  // ---------------------------------------------Login-----------------------------------------------------

  const login = async (inputs) => {
    try {
      const res = await axios.post(`${baseUrl}/api/users/login`, inputs);
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

  // ---------------------------------------------Users-----------------------------------------------------

  const getAllUsers = async () => {
    try {
      const res = await axiosInterceptor.get(`${baseUrl}/api/users`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (user) => {
    try {
      const res = await axiosInterceptor.post(
        `${baseUrl}/api/users/register`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.error) {
        setRegisterError(res.data.error);
        console.log(registerError);
      } else {
        toast.success(res.data.message, {
          position: "bottom-center",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
        });
        navigate("/view-users");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------------------------------------News-----------------------------------------------------

  const createNews = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("desc", data.desc);
    formData.append("catId", data.catId);
    formData.append("userId", userId);
    formData.append("file", data.file);
    try {
      const res = await axiosInterceptor.post(`${baseUrl}/api/news`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      const res = await axiosInterceptor.get(`${baseUrl}/api/news`, {
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
      const res = await axiosInterceptor.delete(`${baseUrl}/api/news/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
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
      const res = axiosInterceptor.get(`${baseUrl}/api/news/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setSingleNews(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateNews = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("desc", data.desc);
    formData.append("catId", data.catId);
    formData.append("userId", userId);
    formData.append("file", data.file);
    try {
      const res = await axiosInterceptor.put(
        `${baseUrl}/api/news/${data.id}`,
        formData,
        {
          header: {
            authorization: `Bearer ${token}`,
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

  // ---------------------------------------------Category-----------------------------------------------------

  const createCategory = async (value) => {
    try {
      const res = await axiosInterceptor.post(
        `${baseUrl}/api/create-category`,
        value,
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
      navigate("/view-categories");
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async (values) => {
    try {
      const res = await axiosInterceptor.get(
        `${baseUrl}/api/get-category`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const editCategory = async (values) => {
    try {
      const res = await axiosInterceptor.put(
        `${baseUrl}/api/update-category/${values.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data, {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      navigate("/view-categories");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axiosInterceptor.delete(
        `${baseUrl}/api/delete-category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data, {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      getCategories();
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------------------------------------Video  -----------------------------------------------------

  const createVideo = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file);
    try {
      const res = await axiosInterceptor.post(
        `${baseUrl}/api/create-video`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.msg) {
        setErrorVideo(res.data.msg);
      }
      if (res.data.msg) {
        toast.success(res.data.msg, {
          position: "bottom-center",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
      navigate("/view-videos");
    } catch (error) {
      console.log(error);
    }
  };

  const getAllVideos = async () => {
    try {
      const res = await axiosInterceptor.get(`${baseUrl}/api/get-videos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllVideos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteVideo = async (id) => {
    try {
      const res = await axiosInterceptor.delete(
        `${baseUrl}/api/delete-video/${id}`,
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
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------------------------------------User -----------------------------------------------------

  const editUser = async (value) => {
    try {
      const res = await axiosInterceptor.put(
        `${baseUrl}/api/edit-user/${value.id}`,
        value,
        {
          header: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message, {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      navigate("/view-users");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await axiosInterceptor.delete(
        `${baseUrl}/api/delete-user/${id}`,
        {
          header: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message, {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      getAllUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const res = await axiosInterceptor.delete(
        `${baseUrl}/api/users/logout`,
        {
          header: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data, {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      navigate("/");
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
        updateNews,
        createCategory,
        getCategories,
        category,
        editCategory,
        createVideo,
        errorVideo,
        getAllVideos,
        allVideos,
        deleteVideo,
        register,
        registerError,
        users,
        editUser,
        deleteUser,
        logout,
        userId,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

