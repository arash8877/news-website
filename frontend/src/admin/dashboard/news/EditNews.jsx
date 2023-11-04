import React, {useState, useEffect, useContext} from "react";
import Dashboard from '../Dashboard'
import * as Yup from "yup";
import { useFormik } from "formik";
import { AuthContext } from "../../../context/context";
import { useParams } from "react-router-dom";

const formSchema = Yup.object({
    title: Yup.string().required("Title is required!"),
    desc: Yup.string().required("Description is required!"),
    catId: Yup.string().required("Choose a category"),
  });

const EditNews = () => {
  return (
    <Dashboard></Dashboard>
  )
}

export default EditNews;