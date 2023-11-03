import React, { useEffect, useState } from "react";
import Dashboard from "../../Dashboard";
import { Link } from "react-router-dom";
import "./news.css";
import { useContext } from "react";
import { AuthContext } from "../../../context/context";

const ViewNews = () => {
  const { news, handleNews, deleteNews } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");

  const handleId = (id) => {
    setId(id);
  }

  useEffect(() => {
    handleNews();
  }, []);

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
          {news?.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>
                  <img src={item.url} width="100" />
                </td>
                <td>{item?.user?.name}</td> //to prevent errors in nested
                objects, added ?
                <td>
                  <button className="button is-success">Edit</button>
                </td>
                <td>
                  <button
                    onClick={() => setShowModal(true)}
                    className="button is-danger"
                  >
                    <span onClick={() => handleId(item.id)}>Delete</span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showModal ? (
        <div className="modal-overlay">
          <div className="delete-modal has-text-centered">
            <h1>Are you sure you want to delete?</h1>
            <button
              onClick={() => deleteNews(id)}
              className="button is-danger mr-5"
            >
              <span onClick={() => setShowModal(false)}>Yes</span>
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="button is-success"
            >
              No
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </Dashboard>
  );
};

export default ViewNews;

//about callback function her:
// <button onClick={() => setShowModal(true)} className="button is-danger">Delete</button>
// if we don't use callback and write onClick={setShowModal(true)}
// we get error as this button is inside a loop.
// but callback, wait until user clicks on the button and the specific item will be deleted
