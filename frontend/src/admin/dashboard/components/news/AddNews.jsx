import React, {useState} from 'react';
import Dashboard from '../../Dashboard';
import * as Yup from "yup";
import { useFormik } from "formik";



const AddNews = () => {

  const [categoryList, setCategoryList] = useState([]);
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");


  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      catId: "",
      file: "",
    },
    onSubmit: (values) => {
      const data = {
        title: values.title,
        desc: values.desc,
        catId: values.catId,
        file: file,
      }
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

      </form>
    </Dashboard>
  )
}

export default AddNews