import React, { useState, useEffect } from "react";
import { Form, Input, Checkbox, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../slice/authSlice";
import axios from "axios";
import "../style/login.scss";

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
    <div className="login-container">
      <Form
        name="login"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h2>Login</h2>
        <Form.Item
          name="username"
          label="Username: "
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password: "
          rules={[
            { required: true, message: "Please enter your password" },
            {
              min: 6,
              message: "Password must be at least 6 characters",
            },
          ]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
        <div>
          <Button type="link" onClick={() => navigate("/forgot-password")}>
            Forgot Password
          </Button>
          <Button type="link" onClick={() => navigate("/register")}>
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Login;
