import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUserData } from "../slice/userSlice";
import { logout } from "../slice/authSlice";
import { Table, Button, Layout, Modal } from "antd";
//import "../style/home.scss";
const { Header, Content, Footer } = Layout;

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state.users.data);
  const status = useSelector((state) => state.users.status);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userToken");
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this user?",
      onOk() {
        dispatch(deleteUserData(id));
      },
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <div className="flex space-x-2">
            <Button
              type="default"
              onClick={() => navigate(`/read/${record.id}`)}
            >
              View
            </Button>
            <Button
              type="primary"
              onClick={() => navigate(`/update/${record.id}`)}
            >
              Edit
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => handleDelete(record.id)}
            >
              Delete
            </Button>
          </div>
        </>
      ),
    },
  ];

  return (
    <Layout>
      {/* Header */}
      <Header className="bg-blue-600 text-white flex justify-between items-center p-4">
        <div className="text-lg font-semibold text-white">
          {user?.email ? (
            <span>Welcome, {user.email}</span>
          ) : (
            <span>Welcome</span>
          )}
        </div>
        <div className="navbar-right">
          <Button type="primary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Header>

      {/* Content */}
      <Content className="p-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold mb-4 text-center">User List</h1>
          <div className="mb-4">
            <Button
              className="bg-green-500 hover:bg-green-600"
              type="primary"
              onClick={() => navigate("/create")}
            >
              Add User
            </Button>
          </div>
          <Table
            className="w-full"
            columns={columns}
            dataSource={users}
            rowKey="id"
            loading={status === "loading"}
          />
        </div>
      </Content>

      {/* Footer */}
      <Footer>
        <div className="bg-blue-600 text-white text-center py-4 w-full">
          {" "}
          2025 Your Company
        </div>
      </Footer>
    </Layout>
  );
}

export default Home;
