import React, { useContext } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import TopMenu from "../components/home/topMenu/TopMenu";
import NavBar from "../components/home/navBar/NavBar";
import Footer from "../components/home/footer/Footer";
import { HomeContext } from "../context/context";

const formSchema = Yup.object({
  email: Yup.string().required("Email is required!"),
  subject: Yup.string().required("Subject is required!"),
  message: Yup.string().required("Message is required!"),
});

const Contact = () => {
  const { handleEmail } = useContext(HomeContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      subject: "",
      cmessageatId: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: formSchema,
  });

  return (
    <>
      <TopMenu />
      <NavBar />
      <div className="columns">
        <div className="colum">
          <img src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?size=626&ext=jpg&ga=GA1.1.572310632.1696408268&semt=ais" />
        </div>
        <div className="column">
          <h1 className="title mb-6">Contact Us</h1>
          <div className="phone-number mb-6 is-size-5">
            <span>Phone number:</span> <span>+4512345678</span>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="field">
              <input
                type="email"
                className="input"
                placeholder="email"
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
                placeholder="Message"
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
      <Footer />
    </>
  );
};

export default Contact;
