import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUserData } from "../slice/userSlice";
import { logout } from "../slice/authSlice";
import { Table, Button, Layout } from "antd";

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
    <Layout className="min-h-screen bg-slate-800">
      {/* Header */}
      <Header className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
        <div className="text-lg font-semibold text-white">
          {user?.email ? `Welcome, ${user.email}` : "Welcome"}
        </div>
        <Button
          type="primary"
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700"
        >
          Logout
        </Button>
      </Header>

      {/* Content */}
      <Content className="p-6">
        <div className="bg-gray-100 shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-semibold mb-6 text-center">User List</h1>

          <Table
            columns={columns}
            dataSource={users}
            rowKey="id"
            loading={status === "loading"}
            className="rounded-md"
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

export default Authors;
