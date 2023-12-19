import React, { useContext, useEffect } from "react";
import Dashboard from "../../Dashboard";
import { AuthContext } from "../../../context/context";

const ViewCommentAdmin = () => {
  const { getAllComments } = useContext(AuthContext);

  useEffect(() => {
    getAllComments();
  }, []);

  
  return (
    <Dashboard>
      <table className="table is-fullwidth">
        <thead className="is-fullwidth">
          <tr>
            <th>Number</th>
            <th>Subject</th>
            <th>Content</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>subject111</td>
            <td>this is a comment</td>
            <td>test@email.com</td>
            <td>
              <button className="button is-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </Dashboard>
  );
};

export default ViewCommentAdmin;