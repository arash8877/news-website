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

        </tbody>
      </table>
    </Dashboard>
  );
};

export default ViewUsers;