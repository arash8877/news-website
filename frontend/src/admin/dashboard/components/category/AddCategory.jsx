import React from "react";
import Dashboard from "../../Dashboard";

import * as Yup from "yup";
import { useFormik } from "formik";
import { AuthContext } from "../../../context/context";
import { baseUrl } from "../../../../utils/baseUrl";

const formSchema = Yup.object({
  name: Yup.string()
    .min(3, "The name should have minimum 3 characters!")
    .max(3, "The name should have maximum 15 characters!")
    .required("Name is required!"),
});

const AddCategory = () => {
  return (
    <Dashboard>
      <form>
        <div className="field">
          <label className="label">Category Name</label>
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="Name for the category"
            />
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
