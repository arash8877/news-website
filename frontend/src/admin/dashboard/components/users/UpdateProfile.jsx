import React, { useState, useContext } from "react";
import Dashboard from "../../Dashboard";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context/context";

const formSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name should be at least 3 characters!")
    .max(15, "Name should be less than 15 characters!")
    .required("Name is required!"),
  password: Yup.string()
    .min(4, "Password should be at least 4 characters!")
    .max(20, "Password should be less than 20 characters!")
    .required("Password is required!"),
  confPassword: Yup.string()
    .min(4, "Confirm password does not match!")
    .max(20, "Confirm password does not match!")
    .required("Confirm Password is required!"),
});

const UpdateProfile = () => {
  const id = useParams();
  const { updateProfile } = useContext(AuthContext);
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      confPassword: "",
      id: id,
      file: "",
    },
    onSubmit: (values) => {
      const data = {
        name: values.name,
        password: values.password,
        confPassword: values.confPassword,
        id: id,
        file: file,
      };
      updateProfile(data);
    },
    validationSchema: formSchema,
  });

  return (
    <Dashboard>
      <form onSubmit={formik.handleSubmit}>
        <div className="field mt-5">
          <label htmlFor="" className="label">
            Profile Image
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
        <div className="field">
          <label htmlFor="" className="label">
            Full Name
          </label>
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="first and last name"
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
          <label htmlFor="" className="label">
            Password
          </label>
          <div className="control">
            <input
              type="password"
              className="input"
              placeholder="password"
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
          <label htmlFor="" className="label">
            Confirm Password
          </label>
          <div className="control">
            <input
              type="password"
              className="input"
              placeholder="confirm password"
              value={formik.values.confPassword}
              onChange={formik.handleChange("confPassword")}
              onBlur={formik.handleBlur("confPassword")}
            />
            <p className="help has-text-danger">
              {formik.touched.confPassword && formik.errors.confPassword}
            </p>
          </div>
        </div>
      </form>
    </Dashboard>
  );
};

export default UpdateProfile;