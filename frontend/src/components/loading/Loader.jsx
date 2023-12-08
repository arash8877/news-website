import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#000");

  const cssOverride = {
    margin: "50px auto",
    textAlign: "center",
  };

  return (
    <ClipLoader
      color={color}
      loading={loading}
      cssOverride={cssOverride}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loader;