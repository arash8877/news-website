import React from "react";
import Dashboard from "../../Dashboard";
import { Link, useLocation, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useContext } from "react";
import { AuthContext } from "../../../context/context";

const EditUser = () => {
  return (
    <Dashboard>
      <div>EditUser</div>
    </Dashboard>
  );
};

export default EditUser;
