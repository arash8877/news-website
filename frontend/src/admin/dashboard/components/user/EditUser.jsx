import React, {useContext} from "react";
import Dashboard from "../../Dashboard";
import { Link, useLocation, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
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
  const {id} = useParams();
  const { editUser } = useContext(AuthContext);


  const formik = useFormik({
    initialValues: {
      name: state.name,
      email: state.email,
      password: "",
      confPassword: "",
      isAdmin: "",
      id: id,
    },
    onSubmit: (values) => {
      editUser(values);
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
      <form onSubmit={formik.handleSubmit}>
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
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="Enter your email"
              defaultValue={state.email}
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
              type="text"
              className="input"
              placeholder="Enter your password"
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
              type="text"
              className="input"
              placeholder="Enter your password again"
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
          <label className="label">Rol</label>
          <div className="control">
            <div className="select is-fullwidth">
              <select
                value={formik.values.isAdmin}
                onChange={formik.handleChange("isAdmin")}
                onBlur={formik.handleBlur("isAdmin")}
              >
                <option>Choose</option>
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
              Save
            </button>
          </div>
        </div>
      </form>
    </Dashboard>
  );
};

export default EditUser;
