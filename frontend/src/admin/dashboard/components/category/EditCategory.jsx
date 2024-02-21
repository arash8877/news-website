import React from "react";
import Dashboard from "../../Dashboard";
import { Link, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AuthContext } from "../../../context/context";
import { baseUrl } from "../../../../utils/baseUrl";

const formSchema = Yup.object({
  name: Yup.string()
    .min(3, "The name should have minimum 3 characters!")
    .max(15, "The name should have maximum 15 characters!")
    .required("Name is required!"),
});

const EditCategory = () => {
    const {state} = useLocation();

  const formik = useFormik({
    initialValues: {
      name: state.name,
    },
    onSubmit: (values) => {
      //   createCategory(values);
    },
    validationSchema: formSchema,
  });

  return (
    <Dashboard>
      <div className="is-flex is-justify-content-end">
        <Link to="/view-category" className="button px-6 is-success mb-6">
          View Categories
        </Link>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="field">
          <label className="label">Edit Name</label>
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="Name for the category"
              defaultValue={state.name}
              onChange={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
            />
            <p className="help has-text-danger">
              {formik.touched.name && formik.errors.name}
            </p>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button type="submit" className="button is-success px-6">
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </Dashboard>
  );
};

export default EditCategory;
