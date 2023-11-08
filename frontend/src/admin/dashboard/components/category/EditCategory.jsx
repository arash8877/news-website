import React, { useContext } from "react";
import Dashboard from "../../Dashboard";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useLocation, useParams } from "react-router-dom";
import ViewCategories from "./ViewCategories";
import { AuthContext } from "../../../context/context";

const formSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title should be more than 3 characters!")
    .max(15, "Title should be less than 15 characters!")
    .required("Title is required!"),
});

const EditCategory = () => {
    const {state} = useLocation();
    const {EditCategory} = useContext(AuthContext);
    const {id} = useParams();

  const formik = useFormik({
    initialValues: {
      title: state.title,
      id: id,
    },
    onSubmit: (values) => {
      EditCategory(values);
    },
    validationSchema: formSchema,
  });

  return (
    <Dashboard>
      <div className="is-flex is-justify-content-end">
        <Link to="/view-categories" className="button px-6 is-success mb-6">
          View Categories
        </Link>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="Title of the category"
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
          <div className="control">
            <button type="submit" className="button is-success px-6">
              Save
            </button>
          </div>
        </div>
      </form>
    </Dashboard>
  );
};

export default EditCategory;