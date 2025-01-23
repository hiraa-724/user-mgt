import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser } from "../slice/userSlice";
import { Form, Input, Button } from "antd";
import "../style/create.scss";

function Create() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    dispatch(createUser(formValues));
    navigate("/home");
  };

  return (
    <div className="container">
      <h1>Create User</h1>
      <Form onFinish={handleSubmit}>
        <Form.Item label="Name" name="name" required>
          <Input
            value={formValues.name}
            onChange={(e) =>
              setFormValues({ ...formValues, name: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Email" name="email" required>
          <Input
            value={formValues.email}
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Phone" name="phone" required>
          <Input
            value={formValues.phone}
            onChange={(e) =>
              setFormValues({ ...formValues, phone: e.target.value })
            }
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Link to="/home">
          <Button type="default">Back</Button>
        </Link>
      </Form>
    </div>
  );
}

export default Create;
