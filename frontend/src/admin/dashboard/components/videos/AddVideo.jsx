import React, { useState, useContext } from "react";
import Dashboard from "../../Dashboard";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AuthContext } from "../../../context/context";

const AddVideo = () => {
  const [file, setFile] = useState({});
  const { createVideo, errorVideo } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      file: "",
    },
    onSubmit: (values) => {
      const data = {
        file: file,
      };
      createVideo(data);
    },
  });

  return (
    <Dashboard>
      <form onSubmit={formik.handleSubmit}>
        <div className="control">
          <label className="label">Upload a video</label>
          <input
            type="file"
            className="input"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <p className="help has-text-danger">{errorVideo}</p>
        </div>
        <button type="submit" className="button is-info is-size-6 px-6 my-6">
          Add Video
        </button>
      </form>
    </Dashboard>
  );
};

export default AddVideo;

