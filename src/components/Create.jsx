import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser } from "../slice/userSlice";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { message } from "antd";

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
    <div className="flex items-center justify-center bg-gray-200 min-h-screen p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center">Create User</h1>
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
            <Form className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block font-medium ">
                  Name
                </label>
                <Field
                  name="name"
                  type="text"
                  placeholder="Enter the name"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block font-medium">
                  Email
                </label>
                <Field
                  name="email"
                  type="text"
                  placeholder="Enter the email"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label htmlFor="phone" className="block font-medium">
                  Phone
                </label>
                <Field
                  name="phone"
                  type="text"
                  placeholder="Enter the phone"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-between mt-6">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Submit"}
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
    </div>
  );
}

export default Create;
