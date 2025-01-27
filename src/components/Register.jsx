import React, { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { registerSuccess, registerFailure } from "../slice/authSlice";
//import "../style/register.scss";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleRegister = async (values) => {
    setLoading(true);
    const { username, email, password, role } = values;

    console.log("Register payload:", { username, email, password, role });

    try {
      const response = await axios.post(
        "https://api.freeapi.app/api/v1/users/register",
        {
          username,
          email,
          password,
          role: role.toUpperCase(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Registration response:", response);

      dispatch(registerSuccess());
      message.success("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error response data:", error.response?.data);
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      dispatch(registerFailure(errorMessage));
      message.error(`Registration failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-200 min-h-screen p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <Form form={form} onFinish={handleRegister} layout="vertical">
          <Form.Item
            label={<span className="font-medium">Username: </span>}
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<span className="font-medium">Email: </span>}
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please input a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<span className="font-medium">Password: </span>}
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label={<span className="font-medium">Role: </span>}
            name="role"
            rules={[{ required: true, message: "Please select a role!" }]}
          >
            <Select placeholder="Select Role">
              <Select.Option value="ADMIN">Admin</Select.Option>
              <Select.Option value="USER">User</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              className="w-full rounded-md font-bold"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Register
            </Button>
          </Form.Item>
          <div className="text-center">
            <Button type="link" onClick={() => navigate("/")}>
              Already have an account? Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
