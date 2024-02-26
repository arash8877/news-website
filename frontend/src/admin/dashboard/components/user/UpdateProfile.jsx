import React, {useState} from "react";
import Dashboard from "../../Dashboard";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useParams } from "react-router-dom";

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
    // const {updateProfile} = useContext(AuthContext)
    const {id} = useParams()
    const [file, setFile] = useState([]);
    const [preview, setPreview] = useState("")
  
  
    const loadImage = (e) => {
      const image = e.target.files[0];
      setFile(image)
      setPreview(URL.createObjectURL(image))
    }

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      confPassword: "",
      id: "id",
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
      console.log(values);
    },
    validationSchema: formSchema,
  });

  return (
    <Dashboard>
      <form onSubmit={formik.handleSubmit}>
        <div className="field pt-3">
          <label className="label">Profile Image</label>
          <div className="control">
            <input type="file" className="input" onChange={loadImage} />
            {preview ? (
              <figure className="mt-3">
                <img src={preview} width="250" alt="" />
              </figure>
            ) : (
              ""
            )}
          </div>
        </div>
      </form>
    </Dashboard>
  );
};

export default UpdateProfile;
