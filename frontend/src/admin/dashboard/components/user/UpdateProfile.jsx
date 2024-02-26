import React from "react";
import Dashboard from "../../Dashboard";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

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


const UpdateProfile = () => {

    const formik = useFormik({
        initialValues: {
          name: "",
          password: "",
          confPassword: "",
          file: "",
        },
        onSubmit: (values) => {
        //   const data = {
        //     title: values.title,
        //     desc: values.desc,
        //     catId: values.catId,
        //     file: file, 
        //   };
        //   createNews(data);
        console.log(values)
        },
        validationSchema: formSchema,
      });


  return (
    <Dashboard>
      <div>UpdateProfile</div>
    </Dashboard>
  );
};

export default UpdateProfile;
