import React from "react";
import TopMenu from "../components/home/topMenu/TopMenu";
import Navbar from "../components/home/navbar/Navbar";
import * as Yup from "yup";
import { useFormik } from "formik";

const formSchema = Yup.object({
  email: Yup.string().required("Email required!"),
  subject: Yup.string().required("subject required!"),
  message: Yup.string().required("message required!"),
});



const Contact = () => {

    const formik = useFormik({
        initialValues: {
          email: "",
          subject: "",
          message: "",
        },
        onSubmit: (values) => {
        //  handleEmail(values);
        console.log(values)
        },
        validationSchema: formSchema,
      });


  return (
    <>
      <TopMenu />
      <div className="contact pt-6">
        <div className="container">
          <div className="columns">
            <div className="column">
              <img src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?t=st=1709122534~exp=1709126134~hmac=3d84661960aa2918478d5af4a92265a3ea05adfc48b2a21f35356f04e64b4e5a&w=740" alt="" />
            </div>
            <div className="column">
              <h1 className="title mb-6">Contact Us</h1>
              <div className="phone-number mb-6 is-size-5">
                <span>Telephone:</span> <span>+45 2233 4455</span>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="field">
                  <input
                    type="text"
                    className="input"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                  />
                  <p className="help has-text-danger">
                    {formik.touched.email && formik.errors.email}
                  </p>
                </div>
                <div className="field">
                  <input
                    type="text"
                    className="input"
                    placeholder="Subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange("subject")}
                    onBlur={formik.handleBlur("subject")}
                  />
                  <p className="help has-text-danger">
                    {formik.touched.subject && formik.errors.subject}
                  </p>
                </div>
                <div className="field">
                  <textarea
                    className="textarea"
                    placeholder="Content"
                    value={formik.values.message}
                    onChange={formik.handleChange("message")}
                    onBlur={formik.handleBlur("message")}
                  ></textarea>

                  <p className="help has-text-danger">
                    {formik.touched.message && formik.errors.message}
                  </p>
                </div>
                <div className="field">
                  <button type="submit" className="button is-success px-6">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default Contact;
