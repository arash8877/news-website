import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
  const [profileName, setProfileName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getProfileInfo();
    
    //to get the latest
    getAllUsers();
    getAllComment();
    handleNews();

  }, []);

  const refreshToken = async () => {
    try {
      const res = await axios.get(`${baseUrl}/token`);
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

  //interceptor (in axios) helps to update the token automatically when the token is expired
  const axiosInterceptor = axios.create();

  axiosInterceptor.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        //expire*1000 to convert expire to millisecond
        const res = await axios.get(`${baseUrl}/token`); //expire * 1000 < currentDate.getTime() ==>
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

  // ---------------------------------------------Login-----------------------------------------------------

  const login = async (inputs) => {
    try {
      const res = await axios.post(`${baseUrl}/api/users/login`, inputs);

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
        getProfileInfo();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const register = async(inputs) => {
    try {
      const res = await axiosInterceptor.post(`${baseUrl}/api/users/register`, inputs, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      if(res.data.error){
        setRegisterError(res.data.error)
      }else{
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
        });
        navigate("/view-users");
      }
    } catch (error) {
      console.log(error);
    }
  }


  // ---------------------------------------------Users-----------------------------------------------------

  const getAllUsers = async () => {
    try {
      const res = await axiosInterceptor.get(`${baseUrl}/api/users`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data)
    } catch (error) {
      console.log(error);
    }
  };

  const editUserProfile = async(data)=> {
    try {
      const formData = new FormData();
      formData.append("name", data.name)
      formData.append("password", data.password)
      formData.append("confPassword", data.confPassword)
      formData.append("id", data.id)
      formData.append("file", data.file)
      const res = await axiosInterceptor.put(`${baseUrl}/api/users/profile/${data.id}`, formData, {
        headers:{
          authorization: `Bearer ${token}`
        }
      })
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  
  const getProfileInfo = async () => {
    try {
      const res = await axiosInterceptor.get(`${baseUrl}/api/users/profile`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      setProfilePhoto(res.data.url);
      setProfileName(res.data.name)
     
    } catch (error) {
      console.log(error);
    }
  }

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
      toast.success(res.data.message, {
        position: "top-center",
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
        headers: {
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
      toast.success(res.data.message, {
        position: "top-center",
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
      // console.log(res)
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
    console.log(data.file);
    try {
      const res = await axiosInterceptor.put(
        `${baseUrl}/api/news/${data.id}`,
        formData,
        {
          headers: {
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
      console.error("Error updating news:", error);
    }
  };

  // ---------------------------------------------Category-----------------------------------------------------

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

  const createCategory = async (value) => {
    try {
      const res = await axiosInterceptor.post(
        `${baseUrl}/api/create-category`,
        value,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message, {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      navigate("/view-category");
    } catch (error) {
      console.log(error);
    }
  };

  const editCategory = async (values) => {
    try {
      const res = await axiosInterceptor.put(
        `${baseUrl}/api/edit-category/${values.id}`,
        values,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data, {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      navigate("/view-category");
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
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data, {
        position: "top-center",
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

  
  const createVideo = async(data) => {
    const formData = new FormData(); //FormData is a javaScript function
    formData.append("file", data.file)
    try {
      const res = await axiosInterceptor.post(`${baseUrl}/api/create-video`, formData,{
        headers: {
          authorization: `Bearer ${token}`
        }
      })
  
      if(res.data.error){
        setErrorVideo(res.data.error)
      }
     if(res.data.message){
      toast.success(res.data.message, {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      navigate("/view-video");
     }
    } catch (error) {
      console.log(error);
    }
  }

  const getAllVideos = async() => {
    try {
      const res = await axiosInterceptor.get(`${baseUrl}/api/get-video`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      setAllVideos(res.data)
    } catch (error) {
      console.log(error);
    }
  }


  const deleteVideo = async(id)=>{
    try {
        const res = await axiosInterceptor.delete(`${baseUrl}/api/delete-video/${id}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
        });
        getAllVideos()
        
    } catch (error) {
      console.log(error);
    }
  }

  // ---------------------------------------------User -----------------------------------------------------

  const editUser = async(value)=>{
    try {
      const res = await axiosInterceptor.put(`${baseUrl}/api/users/${value.id}`, value,{
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      toast.success(res.data.message, {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      navigate("/view-users");
    } catch (error) {
      console.log(error);
    }
  }


  const deleteUser = async(id)=> {
    try {
      const res = await axiosInterceptor.delete(`${baseUrl}/api/users/${id}`,{
        headers:{
          authorization: `Bearer ${token}`
        }
      })
      console.log(res)
      toast.success(res.data.message, {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      getAllUsers()
    } catch (error) {
      console.log(error);
    }
  }

  const logout = async()=> {
    try {
      const res = await axiosInterceptor.delete(`${baseUrl}/api/users/logout`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      navigate("/")
      toast.success(res.data.message, {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // ---------------------------------------------Comments -----------------------------------------------------
  const getAllComment = async()=> {
    try {
      const res = await axiosInterceptor.get(`${baseUrl}/api/comment`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      setComments(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  const deleteComment = async(id)=> {
    try {
      const res = await axiosInterceptor.delete(`${baseUrl}/api/comment/${id}`,{
        headers:{
          authorization : `Bearer ${token}`
        }
      })
      toast.success(res.data, {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      getAllComment()
    } catch (error) {
      console.log(error);
    }
  }

  const activeComment = async(id) => {
    const data = {
      isActive: true
    }
    try {
      const res = await axiosInterceptor.put(`${baseUrl}/api/comment/active/${id}`,data,{
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      getAllComment()
      toast.success(res.data, {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const deactivateComment = async(id) => {
    const data = {
      isActive: false
    }
    try {
      const res = await axiosInterceptor.put(`${baseUrl}/api/comment/deactivate/${id}`,data,{
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      getAllComment()
      toast.success(res.data, {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } catch (error) {
      console.log(error);
    }
  }


  //------------------------------------return---------------------------------------

  return (
    <AuthContext.Provider
      value={{
        login,
        error,
        getAllUsers,
        createNews,
        axiosInterceptor,
        handleNews,
        news,
        deleteNews,
        getSingleNews,
        singleNews,
        updateNews,
        getCategories,
        createCategory,
        category,
        deleteCategory,
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
        editUserProfile,
        getProfileInfo,
        profilePhoto,
        profileName,
        getAllComment,
        comments,
        deleteComment,
        activeComment,
        deactivateComment,
        admin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
