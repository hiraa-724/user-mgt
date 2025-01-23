import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Form, Input, Button, message, Spin } from "antd";
import axios from "axios";
import { fetchUser, updateUserData, setError } from "../slice/userSlice";
import "../style/update.scss";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedUser = useSelector((state) => state.users.selectedUser);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
      axios
        .get(`http://localhost:3000/users/${id}`)
        .then((response) => {
          dispatch(fetchUser(id));
        })
        .catch((err) => {
          dispatch(setError(err.message));
          message.error("Failed to fetch user data.");
        });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedUser) {
      form.setFieldsValue({
        name: selectedUser.name || "",
        email: selectedUser.email || "",
        phone: selectedUser.phone || "",
      });
    }
  }, [selectedUser, form]);

  const handleSubmit = (values) => {
    const updatedUser = { id, ...values };

    dispatch(updateUserData(updatedUser))
      .then(() => {
        message.success("User updated successfully!");
        navigate("/home");
      })
      .catch((err) => {
        console.error("Update failed:", err);
        message.error("Update failed. Please try again.");
      });
  };

  if (status === "loading") {
    return (
      <div className="update-user__loading">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <p className="update-user__error">Error: {error}</p>;
  }

  return (
    <div className="update-user">
      <Form
        form={form}
        layout="vertical"
        className="update-user__form"
        onFinish={handleSubmit}
      >
        <h1>Update User</h1>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter the name" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter the email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please input the user's phone!" },
          ]}
        >
          <Input placeholder="Enter Phone" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Update
          </Button>
        </Form.Item>
        <Form.Item>
          <Link to="/home">
            <Button type="default">Back</Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Update;
