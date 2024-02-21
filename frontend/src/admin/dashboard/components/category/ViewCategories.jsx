import React from "react";
import Dashboard from "../../Dashboard";
import { Link } from "react-router-dom";

const ViewCategories = () => {
  return (
    <Dashboard>
      <div className="is-flex is-justify-content-end">
        <Link to="/add-category" className="button px-6 is-success mb-6">
          Add Category
        </Link>
      </div>

      <table className="table is-fullwidth">
        <thead className="is-fullwidth">
          <tr>
            <th>Number</th>
            <th>Title</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
            <tr>
                <td>1</td>
                <td>test!</td>
                <td>
                    <Link to="/" className="button is-info">Edit</Link>
                </td>
                <td>
                    <button className="button is-danger">Delete</button>
                </td>
            </tr>
        </tbody>


      </table>


    </Dashboard>
  );
};

export default ViewCategories;
