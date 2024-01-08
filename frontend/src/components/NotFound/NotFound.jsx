import React, {useContext} from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../admin/context/context";

const NotFound = () => {
  const { userId } = useContext(AuthContext);
  return (
    <div className="not-found is-flex is-align-items-center is-justify-content-center">
      <div className="container">
        <div className="column has-text-centered">
          {userId ? (
            <>
              <h1 className="has-text-white has-text-centered is-size-2 is-fullwidth">
                Page Not Found!
              </h1>
              <Link to="/" className="button is-success large is-size-5 mt-6">
                Go to Homepage
              </Link>
            </>
          ) : (
            <>
              <h1 className="has-text-white has-text-centered is-size-2 is-fullwidth">
                You should log in first to see this page!
              </h1>
              <Link
                to="/administrator"
                className="button is-success large is-size-5 mt-6"
              >
                Log in
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
