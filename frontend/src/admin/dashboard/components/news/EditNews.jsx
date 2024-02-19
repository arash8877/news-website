import React, { useState, useEffect, useContext } from "react";
import Dashboard from "../../Dashboard";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AuthContext } from "../../../context/context";
import { useParams } from "react-router-dom";

const formSchema = Yup.object({
  title: Yup.string().required("Title is required!"),
  desc: Yup.string().required("Description is required!"),
  catId: Yup.string().required("Choose a category"),
});

const EditNews = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const { axiosInterceptor, token, createNews, getSingleNews, singleNews } = useContext(AuthContext);



  const getCategory = async () => {
    try {
      const res = await axiosInterceptor.get(
        "http://localhost:300/api/get-category",
        {
          Headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setCategoryList(res.data);
    } catch (error) {
      console.log(error);
    }
  };



  return <div>EditNews</div>;
};

export default EditNews;
