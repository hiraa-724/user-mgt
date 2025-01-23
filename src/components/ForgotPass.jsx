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
import "../style/forgot-password.scss";

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
    <div className="forgot-password-container">
      <Form
        name="forgot-password"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <h2>Forgot Password</h2>
        <Form.Item
          name="email"
          label="Email: "
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
          <Input placeholder="Enter your registered Email" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Reset Password
          </Button>
        </Form.Item>
        <div className="forgot-password-links">
          <Button type="link" onClick={() => navigate("/")}>
            Back to Login
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ForgotPassword;
