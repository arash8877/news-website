import React, { useContext } from "react";
import Dashboard from "../../Dashboard";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AuthContext } from "../../../context/context";

const formSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title should be more than 3 characters!")
    .max(15, "Title should be less than 15 characters!")
    .required("Title is required!"),
});

const AddCategory = () => {
  const { createCategory } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: (values) => {
      createCategory(values);
    },
    validationSchema: formSchema,
  });

  return (
    <Dashboard>
      <form onSubmit={formik.handleSubmit}>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="Title of the category"
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
              Add
            </button>
          </div>
        </div>
      </form>
    </Dashboard>
  );
};

export default AddCategory;