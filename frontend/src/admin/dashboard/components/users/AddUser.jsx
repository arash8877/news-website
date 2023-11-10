import React, { useContext } from "react";
import Dashboard from "../../Dashboard";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AuthContext } from "../../../context/context";
import { Link } from "react-router-dom";

const formSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name should be at least 3 characters!")
    .max(15, "Name should be less than 15 characters!")
    .required("Name is required!"),
  email: Yup.string()
    .email("Email is not valid!")
    .required("Email is required!"),
  password: Yup.string()
    .min(4, "Password should be at least 4 characters!")
    .max(20, "Password should be less than 20 characters!")
    .required("Password is required!"),
  confPassword: Yup.string()
    .min(4, "Confirm password does not match!")
    .max(20, "Confirm password does not match!")
    .required("Confirm Password is required!"),
  isAdmin: Yup.string().required("Role is required!"),
});

const AddUser = () => {
  const { register, registerError } = useContext(AuthContext);
  console.log(registerError)

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confPassword: "",
      isAdmin: "",
    },
    onSubmit: (values) => {
      register(values);
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
      <div className="is-flex">
        <p className="help has-text-danger mb-5 is-size-6">{registerError}</p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="field">
          <label className="label">Full Name</label>
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="Your full name"
              value={formik.values.name}
              onChange={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
            />
            <p className="help has-text-danger">
              {formik.touched.name && formik.errors.name}
            </p>
          </div>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              type="email"
              className="input"
              placeholder="Your email"
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
            />
            <p className="help has-text-danger">
              {formik.touched.email && formik.errors.email}
            </p>
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              type="password"
              className="input"
              placeholder="Your password"
              value={formik.values.password}
              onChange={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
            />
            <p className="help has-text-danger">
              {formik.touched.password && formik.errors.password}
            </p>
          </div>
        </div>
        <div className="field">
          <label className="label">Confirm Password</label>
          <div className="control">
            <input
              type="password"
              className="input"
              placeholder="Confirm password"
              value={formik.values.confPassword}
              onChange={formik.handleChange("confPassword")}
              onBlur={formik.handleBlur("confPassword")}
            />
            <p className="help has-text-danger">
              {formik.touched.confPassword && formik.errors.confPassword}
            </p>
          </div>
        </div>
        <div className="field">
          <label className="label">Role</label>
          <div className="control">
            <div className="select is-fullwidth">
              <select
                value={formik.values.isAdmin}
                onChange={formik.handleChange("isAdmin")}
                onBlur={formik.handleBlur("isAdmin")}
              >
                <option>Choose a role</option>
                <option value="0">Author</option>
                <option value="1">Admin</option>
              </select>
              <p className="help has-text-danger">
                {formik.touched.isAdmin && formik.errors.isAdmin}
              </p>
            </div>
          </div>
        </div>
        <div className="field mt-6">
          <div className="control">
            <button type="submit" className="button is-success px-6">
              Add User
            </button>
          </div>
        </div>
      </form>
    </Dashboard>
  );
};

export default AddUser;
