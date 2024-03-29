import React, { useState, useEffect, useContext } from "react";
import Dashboard from "../../Dashboard";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AuthContext } from "../../../context/context";
import { useLocation, useParams } from "react-router-dom";
import { baseUrl } from "../../../../utils/baseUrl";

const formSchema = Yup.object({
  title: Yup.string().required("Title is required!"),
  desc: Yup.string().required("Description is required!"),
  catId: Yup.string().required("Choose a category"),
});

const EditNews = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const { axiosInterceptor, token, getSingleNews, updateNews } =
    useContext(AuthContext);

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const { id } = useParams();
  const {state} = useLocation();

  useEffect(() => {
    getCategory();
    getSingleNews(id);
  }, []);

  const getCategory = async () => {
    try {
      const res = await axiosInterceptor.get(`${baseUrl}/api/get-category`, {
        Headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setCategoryList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: state.title,
      desc: state.desc,
      catId: state.catId,
      file: "",
    },
    onSubmit: (values) => {
      const data = {
        title: values.title,
        desc: values.desc,
        catId: values.catId,
        file: file,
        id: id,
      };
      console.log(data)
      updateNews(data);
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
              defaultValue={state.title}
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
              defaultValue={state.desc}
              onChange={formik.handleChange("desc")}
              onBlur={formik.handleBlur("desc")}
            ></textarea>
            <p className="help has-text-danger">
              {formik.touched.desc && formik.errors.desc}
            </p>
          </div>
        </div>
        <div className="field">
          <label htmlFor="" className="label">
            Category
          </label>
          <div className="control">
            <div className="select is-fullwidth">
              <select
                defaultValue={state.catId}
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

export default EditNews;
