import React from "react";
import Dashboard from "../../Dashboard";
import { Link, useLocation, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useContext } from "react";
import { AuthContext } from "../../../context/context";

const formSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name should have minimum 3 characters!")
    .max(15, "Name should have maximum 15 characters!")
    .required("Name is required!"),
  email: Yup.string().email("Enter your email!").required("Email is required!"),
  password: Yup.string()
    .min(4, "Password should have minimum 4 characters!")
    .max(20, "Password should have maximum 15 characters!")
    .required("Password is required!"),
  confPassword: Yup.string()
    .min(4, "Password should have minimum 4 characters!")
    .max(20, "Password should have maximum 15 characters!")
    .required("Confirm password is required!"),
  isAdmin: Yup.string().required("Rol is required!"),
});

const EditUser = () => {
  const { state } = useLocation();

  const formik = useFormik({
    initialValues: {
      name: state.name,
      email: state.email,
      password: "",
      confPassword: "",
      isAdmin: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: formSchema,
  });

  return (
    <Dashboard>
      <div className="is-flex is-justify-content-end">
        <Link to="/view-users" className="button px-6 is-success mb-6">
          View Users
        </Link>
      </div>
      <div className="is-flex mb-5 is-size-4">Edit User</div>
      <form>
        <div className="field">
          <label className="label">Full Name</label>
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="Type your name"
              defaultValue={state.name}
              onChange={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
            />
            <p className="help has-text-danger">
              {formik.touched.name && formik.errors.name}
            </p>
          </div>
        </div>
      </form>
    </Dashboard>
  );
};

export default EditUser;
