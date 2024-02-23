import React, { useContext, useEffect, useState } from "react";
import Dashboard from "../../Dashboard";
import { AuthContext } from "../../../context/context";
import { Link } from "react-router-dom";

const ViewUsers = () => {
  const { news, handleNews, deleteNews } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");

  const handleId = (id) => {
    setId(id);
  };

    useEffect(() => {
      handleNews();
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
            <th>Rol</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Arash</td>
            <td>arash@gmail.com</td>
            <td>Manager</td>
            <td>
              <Link to="/" className="button is-info">Edit</Link>
            </td>
            <td>
              <button className="button is-danger ">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

    </Dashboard>
  );
};

export default ViewUsers;
