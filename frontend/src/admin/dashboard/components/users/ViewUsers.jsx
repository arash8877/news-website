import React, { useContext, useEffect } from "react";
import Dashboard from "../../Dashboard";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/context";

const ViewUsers = () => {
  const { users, getAllUsers } = useContext(AuthContext);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Dashboard>
      <div className="is-flex is-justify-content-end">
        <Link to="/add-user" className="button px-6 is-success mb-6">
          Add User
        </Link>
      </div>

      <table className="table is-fullwidth">
        <thead className="is-fullwidth">
          <tr>
            <th>Number</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Image</th>
            <th>role</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((user, index) => {
            return (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Admin" : "Author"}</td>
                <td>
                  <Link to="/" className="button is-info">
                    Edit
                  </Link>
                </td>
                <td>
                  <button className="button is-danger">Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Dashboard>
  );
};

export default ViewUsers;
