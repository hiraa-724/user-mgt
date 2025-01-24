import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser } from "../slice/userSlice";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { message } from "antd";
import "../style/create.scss";

const validationSchema = yup.object({
  name: yup.string().required("Please enter the name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter the email"),
  phone: yup.string().required("Please enter phone"),
});

function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    try {
      dispatch(createUser(values));
      message.success("User created successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
      message.error("User creation failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <h1>Create User</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="create-form">
            {/* name  */}
            <div className="form-item">
              <label htmlFor="name">Name</label>
              <Field
                name="name"
                type="text"
                placeholder="Enter the name"
                className="create-input"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="error-message"
              />
            </div>

            {/* email  */}
            <div className="form-item">
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                type="text"
                placeholder="Enter the email"
                className="create-input"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>

            {/* phone  */}
            <div className="form-item">
              <label htmlFor="phone">Phone</label>
              <Field
                name="phone"
                type="text"
                placeholder="Enter the phone"
                className="create-input"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="error-message"
              />
            </div>

            {/* buttons */}
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Submit"}
            </button>

            <Link to="/home">
              <button type="default" className="back-btn">
                Back
              </button>
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Create;
