import React, { useContext, useEffect, useState } from "react";
import Dashboard from "../../Dashboard";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AuthContext } from "../../../context/context";
import { baseUrl } from "../../../../utils/baseUrl";

const formSchema = Yup.object({
  title: Yup.string().required("Title is required!"),
  desc: Yup.string().required("Description is required!"),
  catId: Yup.string().required("Choose a category!"),
});

const AddNews = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [file, setFile] = useState([]);
  const [preview, setPreview] = useState("");
  const { axiosInterceptor, token, createNews } = useContext(AuthContext);
  console.log(categoryList);
  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  useEffect(() => {
    getCategory();
  }, []); //I didn't put try-catch directly inside the useEffect as async,await can't be inside a callback.



  const getCategory = async () => {
    try {
      const res = await axiosInterceptor.get(`${baseUrl}/api/get-category`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (Array.isArray(res.data)) {
        setCategoryList(res.data);
      } else {
        console.error("Invalid response format. Expected an array.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      catId: "",
      file: "",
    },
    onSubmit: (values) => {
      //onSubmit, get the values of the initialValues and send them to data base
      const data = {
        title: values.title,
        desc: values.desc,
        catId: values.catId,
        file: file, //file comes from state, not from formik
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
              value={formik.values.title}
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
              value={formik.values.desc}
              onChange={formik.handleChange("desc")}
              onBlur={formik.handleBlur("desc")}
            ></textarea>
            <p className="help has-text-danger">
              {formik.touched.desc && formik.errors.desc}
            </p>
          </div>
        </div>
        <div className="field">
          <label className="label">Category</label>
          <div className="control">
            <div className="select is-fullwidth">
              <select
                value={formik.values.catId}
                onChange={formik.handleChange("catId")}
                onBlur={formik.handleBlur("catId")}
              >
                <option>Choose a category</option>
                {categoryList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <p className="help has-text-danger">
                {formik.touched.catId && formik.errors.catId}
              </p>
            </div>
          </div>
        </div>
        <div className="field mt-5">
          <label htmlFor="" className="label">
            Image
          </label>
          <div className="control">
            <input type="file" className="input" onChange={loadImage} />
            {preview ? (
              <figure className="mt-3">
                <img src={preview} width="250" alt="news-image" />
              </figure>
            ) : (
              ""
            )}
          </div>
          <div className="field mt-6">
            <div className="control">
              <button type="submit" className="button is-success px-6">
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </Dashboard>
  );
};

export default AddNews;
