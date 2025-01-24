import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { message, Spin } from "antd";
import * as yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
//import axios from "axios";
import { fetchUser, updateUserData, setError } from "../slice/userSlice";
import "../style/update.scss";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedUser = useSelector((state) => state.users.selectedUser);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  const newValidations = yup.object({
    name: yup.string().required("Please enter the name"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter the email"),
    phone: yup.string().required("Please enter phone"),
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id))
        .then(() => {})
        .catch((err) => {
          dispatch(setError(err.message));
          message.error("Failed to fetch user data.");
        });
    }
  }, [dispatch, id]);

  const handleSubmit = (values, { setSubmitting }) => {
    const updatedUser = { id, ...values };

    dispatch(updateUserData(updatedUser))
      .then(() => {
        message.success("User updated successfully!");
        navigate("/home");
      })
      .catch((err) => {
        console.error("Update failed:", err);
        message.error("Update failed. Please try again.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  if (status === "loading") {
    return (
      <div className="update-userLoading">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <p className="update-userError">Error: {error}</p>;
  }

  return (
    <div className="update-user">
      <h1>Update User</h1>
      <Formik
        validationSchema={newValidations}
        enableReinitialize
        initialValues={{
          name: selectedUser?.name || "",
          email: selectedUser?.email || "",
          phone: selectedUser?.phone || "",
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* name */}
            <label htmlFor="name">Name</label>
            <Field
              type="text"
              name="name"
              placeholder="Enter name"
              className="input-field"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="error-message"
            />

            {/* email */}
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              name="email"
              placeholder="Enter email"
              className="input-field"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />

            {/* phone */}
            <label htmlFor="phone">Phone</label>
            <Field
              type="text"
              name="phone"
              placeholder="Enter phone"
              className="input-field"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="error-message"
            />

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>

            <Link to="/home">
              <button type="button" className="back-btn">
                Back
              </button>
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Update;
