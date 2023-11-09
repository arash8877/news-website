import React from "react";
import Dashboard from "../../Dashboard";

const AddVideo = () => {
  return (
    <Dashboard>
      <form>
        <div className="control">
            <label className="label">Upload a video</label>
            <input type="file" className="input" />
        </div>
        <button type="submit" className="button is-info is-size-6 px-6 my-6">Add Video</button>
      </form>
    </Dashboard>
  );
};

export default AddVideo;