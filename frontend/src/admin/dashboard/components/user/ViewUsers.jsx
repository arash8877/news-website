import React, { useContext, useEffect, useState } from "react";
import Dashboard from "../../Dashboard";
import { AuthContext } from "../../../context/context";
import { Link } from "react-router-dom";

const ViewUsers = () => {
  const { getAllUsers, users, handleNews, deleteUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");

  const handleId = (id) => {
    setId(id);
  };

    useEffect(() => {
      handleNews();
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
            <th>Rol</th>
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
                  <Link state={user} className="button is-info" to={`/edit-user/${user.id}`}>
                    Edit
                  </Link>
                </td>
                <td>
                  {
                    user.isAdmin ? 
                    (
                      <button className="button is-danger" disabled>
                        Can't Deleted
                      </button>
                    )
                    : (
                      <button className="button is-danger" onClick={()=> deleteUser(user.id)}>Delete</button>
                    )
                  }
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
