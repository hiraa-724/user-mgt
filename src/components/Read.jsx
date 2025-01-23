import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../slice/userSlice";
import { Button } from "antd";
import "../style/read.scss";

function Read({ isEditable }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.selectedUser);
  const status = useSelector((state) => state.users.status);

  useEffect(() => {
    dispatch(fetchUser(id));
  }, [id, dispatch]);

  return (
    <div className="container">
      <h3>User Details</h3>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>
            <strong>Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Phone:</strong> {user?.phone}
          </p>

          {/* Conditional rendering for Edit button */}
          {isEditable && (
            <Link to={`/update/${id}`}>
              <Button type="primary">Edit</Button>
            </Link>
          )}
          <Link to="/home">
            <Button type="default" style={{ marginLeft: isEditable ? 10 : 0 }}>
              Back
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Read;
