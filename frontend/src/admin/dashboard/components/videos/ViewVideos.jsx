import React from "react";
import Dashboard from "../../Dashboard";
import { Link } from "react-router-dom";

const ViewVideos = () => {
  return (
    <Dashboard>
      <div className="is-flex is-justify-content-end">
        <Link to="/add-video" className="button px-6 is-success mb-6">
          Add Video
        </Link>
      </div>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Number</th>
            <th>Video</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>test</td>
            <td>
              <button className="button is-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </Dashboard>
  );
};

export default ViewVideos;