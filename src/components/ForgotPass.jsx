import { Form, Input, Button, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
} from "../slice/authSlice";
//import "../style/forgot-password.scss";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (data) => {
    setLoading(true);
    dispatch(forgotPasswordRequest());

    try {
      const response = await axios.post(
        "https://api.freeapi.app/api/v1/users/forgot-password",
        {
          email: data.email,
        }
      );

      message.success("Reset link sent to your email!");
      dispatch(forgotPasswordSuccess());
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to send reset link.";
      dispatch(forgotPasswordFailure(errorMessage));
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (error) => {
    message.error("Failed to send reset link. Please check your input.");
  };

  return (
    <div className="flex items-center justify-center bg-gray-200 min-h-screen p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <Form
          name="forgot-password"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
          <Form.Item
            name="email"
            label={<span className="font-medium">Email: </span>}
            rules={[
              {
                required: true,
                message: "Please enter your Email Address",
              },
              {
                type: "email",
                message: "Enter a valid Email Address",
              },
            ]}
          >
            <Input
              className="rounded border-black shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your registered Email"
            />
          </Form.Item>
          <Form.Item>
            <Button
              className="w-full rounded-md font-bold"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Reset Password
            </Button>
          </Form.Item>
          <div className="flex items-center justify-center">
            <Button type="link" onClick={() => navigate("/")}>
              Back to Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPassword;
