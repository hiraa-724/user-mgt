import React, { useState, useEffect } from "react";
import { Form, Input, Checkbox, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../slice/authSlice";
import axios from "axios";
//import "../style/login.scss";

function Login() {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth) {
      navigate("/home");
    }
  }, [auth, navigate]);

  const onFinish = async (data) => {
    setLoading(true);

    const credentials = {
      username: data.username,
      password: data.password,
    };

    try {
      console.log("Sending Request to API with Data: ", credentials);

      const response = await axios.post(
        "https://api.freeapi.app/api/v1/users/login",
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response: ", response.data);

      const { accessToken, user } = response.data.data;
      dispatch(loginSuccess({ token: accessToken, user }));
      message.success("Login Successful");

      if (user.role === "ADMIN") {
        navigate("/home");
      } else if (user.role === "USER") {
        navigate("/authors");
      }
    } catch (error) {
      console.error("API Error: ", error.response || error.message);

      const errorMessage =
        error.response?.data?.message || error.message || "Login Failed";
      dispatch(loginFailure(errorMessage));
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (error) => {
    message.error("Login Failed. Please check your input.");
  };

  return (
    <div className="flex items-center justify-center bg-gray-200 min-h-screen p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <Form.Item
            name="username"
            label={<span className="font-medium">Username: </span>}
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input
              className="rounded border-black shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={<span className="font-medium">Password</span>}
            rules={[
              { required: true, message: "Please enter your password" },
              {
                min: 6,
                message: "Password must be at least 6 characters",
              },
            ]}
          >
            <Input.Password
              className="rounded border-black shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="text-black">Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              className="w-full rounded bg-blue-500 px-4 py-2 text-white font-bold hover:bg-blue-600"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>
          <div className="flex items-center justify-between">
            <Button
              className="text-blue-500 hover:text-blue-600"
              type="link"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password
            </Button>
            <Button
              className="text-blue-500 hover:text-blue-600"
              type="link"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
