import React, { useContext, useEffect } from "react";
import Dashboard from "../../Dashboard";
import { AuthContext } from "../../../context/context"; 

const ViewComment = () => {
  const { getAllComment, comments, deleteComment, activeComment ,unActiveComment} =
    useContext(AuthContext);


  useEffect(() => {
    getAllComment();
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
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {comments?.map((comment, index) => {
            return (
              <tr key={comment.id}>
                <td>{index + 1}</td>
                <td>{comment.subject}</td>
                <td>{comment.description}</td>
                <td>{comment.email}</td>
                <td>
                  {comment.isActive ? (
                    <button className="button is-success" onClick={()=> unActiveComment(comment.id)}>Active</button>
                  ) : (
                    <button
                      className="button is-warning"
                      onClick={() => activeComment(comment.id)}
                    >
                      Deactivate
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="button is-danger"
                    onClick={() => deleteComment(comment.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Dashboard>
  );
};

export default ViewComment;
