import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUserData } from "../slice/userSlice";
import { logout } from "../slice/authSlice";
import { Table, Button, Layout } from "antd";
import "../style/authors.scss";

const { Header, Content, Footer } = Layout;

function Authors() {
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
    navigate("/");
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
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => navigate(`/read/${record.id}`)}>
            View
          </Button>
        </>
      ),
    },
  ];

  return (
    <Layout className="author-layout">
      {/* Header */}
      <Header className="author-header">
        <div className="navbar-left">
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
      <Content className="author-content">
        <div className="user-list-container">
          <h1>User List</h1>

          <Table
            columns={columns}
            dataSource={users}
            rowKey="id"
            loading={status === "loading"}
          />
        </div>
      </Content>

      {/* Footer */}
      <Footer className="author-footer"> 2025 Your Company</Footer>
    </Layout>
  );
}

export default Authors;
