import React, { useContext, useEffect } from "react";
import Dashboard from "../../Dashboard";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/context";

const ViewCategories = () => {
  const { getCategories, category, deleteCategory } = useContext(AuthContext);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Dashboard>
      <div className="is-flex is-justify-content-end">
        <Link to="/add-category" className="button px-6 is-success mb-6">
          Add category
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
          {category &&
            category.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>
                    <Link state={item} to={`/edit-category/${item.id}`} className="button is-info">
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button onClick={() => deleteCategory(item.id)} className="button is-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Dashboard>
  );
};

export default ViewCategories;