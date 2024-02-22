import React, {useContext} from "react";
import Dashboard from "../../Dashboard";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/context";

const ViewVideo = () => {
    const {getAllVideo,allVideo,deleteVideo} = useContext(AuthContext)
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
          {allVideo &&
            allVideo.map((video, index) => (
              <tr key={video.id}>
                <td>{index + 1}</td>
                <td>
                  <video src={video.url} width="200" controls></video>
                </td>
                <td>
                  <button
                    className="button is-danger"
                    onClick={() => deleteVideo(video.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Dashboard>
  );
};

export default ViewVideo;
