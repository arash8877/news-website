import React, {useContext} from "react";
import Dashboard from "../../Dashboard";

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

const AddCategory = () => {
    const {createCategory} = useContext(AuthContext)

      
           const formik = useFormik({
                initialValues: {
                     name: "",
                },
                onSubmit: (values) => {
                  createCategory(values);
                },
                validationSchema: formSchema
           })


  return (
    <Dashboard>
      <form onSubmit={formik.handleSubmit}>
        <div className="field">
          <label className="label">Category Name</label>
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="Name for the category"
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
              Save
            </button>
          </div>
        </div>
      </form>
    </Dashboard>
  );
};

export default AddCategory;
