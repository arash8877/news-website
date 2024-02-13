import React, { useEffect, useState } from "react";
import Dashboard from "../../Dashboard";
import { Link } from "react-router-dom";
import "./News.css";
import { useContext } from "react";
import { AuthContext } from "../../../context/context";

const ViewNews = () => {
  const { news, deleteNews } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");

  const handleId = (id) => {
    setId(id);
  };

  //   useEffect(() => {
  //     handleNews();
  //   }, []);

  return (
    <Dashboard>
      <div className="is-flex is-justify-content-end">
        <Link to="/add-news" className="button px-6 is-success mb-6">
          Add News
        </Link>
      </div>

      <table className="table is-fullwidth">
        <thead className="is-fullwidth">
          <tr>
            <th>Number</th>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Author</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
        <tr>
            <td>Number</td>
            <td>Title</td>
            <td>Description</td>
            <td>Image</td>
            <td>Author</td>
            <td><button className="button is-success">Edit</button></td>
            <td><button className="button is-danger">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </Dashboard>
  );
};

export default ViewNews;

{
  /* about callback function here:
 <button onClick={() => setShowModal(true)} className="button is-danger">Delete</button>
 if we don't use callback and write onClick={setShowModal(true)}
 we get error as this button is inside a loop.
 but callback, wait until user clicks on the button and the specific item will be deleted */
}

{
  /* in react-router-dom 'state' is a prop that enable
you to send something. and you don't need to
send request to database to get that ting */
}
