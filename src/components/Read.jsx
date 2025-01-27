import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../slice/userSlice";
import { Button } from "antd";

function Read({ isEditable }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.selectedUser);
  const status = useSelector((state) => state.users.status);

  useEffect(() => {
    dispatch(fetchUser(id));
  }, [id, dispatch]);

  return (
    <div className="flex items-center justify-center p-4 bg-gray-300 min-h-screen">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h3 className="text-2xl text-center font-semibold mb-4">
          User Details
        </h3>
        {status === "loading" ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <>
            <p className="mb-2">
              <strong className="font-medium">Name:</strong> {user?.name}
            </p>
            <p className="mb-2">
              <strong className="font-medium">Email:</strong> {user?.email}
            </p>
            <p className="mb-4">
              <strong className="font-medium">Phone:</strong> {user?.phone}
            </p>

            {/* Conditional rendering for Edit button */}
            {isEditable && (
              <Link to={`/update/${id}`} className="inline-block mb-4">
                <Button type="primary" className="mr-2">
                  Edit
                </Button>
              </Link>
            )}

            <Link to="/home" className="inline-block">
              <Button type="default">Back</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Read;
