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
  const { axiosInterceptor, token, createNews, getSingleNews, singleNews } =
    useContext(AuthContext);

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

  const formik = useFormik({
    initialValues: {
      title: singleNews.title,
      desc: singleNews.desc,
      catId: singleNews.catId,
      file: "",
    },
    onSubmit: (values) => {
      const data = {
        title: values.title,
        desc: values.desc,
        catId: values.catId,
        file: file,
      };
      createNews(data);
    },
    validationSchema: formSchema,
  });

  return (
    <Dashboard>
      <form onSubmit={formik.handleSubmit}>
        <div className="field">
          <label htmlFor="" className="label">
            Title
          </label>
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="title"
              defaultValue={singleNews.title}
              onChange={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
            />
            <p className="help has-text-danger">
              {formik.touched.title && formik.errors.title}
            </p>
          </div>
        </div>
        <div className="field">
          <label htmlFor="" className="label">
            Description
          </label>
          <div className="control">
            <textarea
              className="textarea"
              placeholder="Description of the news"
              defaultValue={singleNews.desc}
              onChange={formik.handleChange("desc")}
              onBlur={formik.handleBlur("desc")}
            ></textarea>
            <p className="help has-text-danger">
              {formik.touched.desc && formik.errors.desc}
            </p>
          </div>
        </div>
      </form>
    </Dashboard>
  );
};

export default EditNews;
