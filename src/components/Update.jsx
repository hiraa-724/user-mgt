import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { message, Spin } from "antd";
import * as yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
//import axios from "axios";
import { fetchUser, updateUserData, setError } from "../slice/userSlice";

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
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Update User</h1>
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
          <Form className="space-y-4">
            {/* name */}
            <div>
              <label htmlFor="name" className="block font-medium mb-2">
                Name
              </label>
              <Field
                type="text"
                name="name"
                placeholder="Enter name"
                className="input-field w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* email */}
            <div>
              <label htmlFor="email" className="block font-medium mb-2">
                Email
              </label>
              <Field
                type="email"
                name="email"
                placeholder="Enter email"
                className="input-field w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* phone */}
            <div>
              <label htmlFor="phone" className="block font-medium mb-2">
                Phone
              </label>
              <Field
                type="text"
                name="phone"
                placeholder="Enter phone"
                className="input-field w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update"}
              </button>
              <Link to="/home">
                <button
                  type="button"
                  className="bg-gray-300 text-black py-2 px-6 rounded-md hover:bg-gray-400"
                >
                  Back
                </button>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Update;
