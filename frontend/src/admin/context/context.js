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
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    handleNews();
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


// ---------------------------------------------Users-----------------------------------------------------

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
    // console.log(res.data)
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
    console.log(res)
    // setSingleNews(res.data);
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
    navigate("/view-news");
  } catch (error) {
    console.log(error);
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




// ---------------------------------------------Video  -----------------------------------------------------






 // ---------------------------------------------User -----------------------------------------------------





// ---------------------------------------------Comments -----------------------------------------------------





  return (
    <AuthContext.Provider value={{ login, error, getAllUsers,createNews, axiosInterceptor, handleNews, news, deleteNews, getSingleNews, singleNews, updateNews }}>
      {children}
    </AuthContext.Provider>
  );
};






