import React, { useContext } from "react";
import "./PopularNews.css";
import { HomeContext } from "../../../context/context";
import Loader from "../../loading/Loader";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";

const PopularNews = () => {
  const { loadingPopularNews, errorPopularNews, popularNews } =
    useContext(HomeContext);

  return (
    <div className="container mt-6">
      <div className="columns">
        {loadingPopularNews ? (
          <div className="column is-four-fifths has-background-white p-4 has-text-centered">
            <Loader />
          </div>
        ) : (
          <div className="column is-four-fifths has-background-white p-4">
            <div className="popular mb-5">
              <h1>Popular News</h1>
            </div>
            <div className="columns">
              {popularNews &&
                popularNews?.map((item) => {
                  return (
                    <div className="column popular-news">
                      <div className="popular-img is-relative">
                        <Link to={`/details/${item.id}`} state={item}>
                          <img
                            src={item.url}
                            className="is-fullwidth popular-image"
                          />
                        </Link>
                        <div className="num-views">
                          <span>
                            {item.numViews}
                            <BsEye />
                          </span>
                        </div>
                      </div>
                      <div className="popular-title">
                        <h6 className="is-flex has-text-weight-bold is-size-5">
                          <Link to={`/details/${item.id}`} state={item}>
                            {item.title}
                          </Link>
                        </h6>
                      </div>
                      <div className="author mt-4">
                        <span className="is-size-6 has-text-grey mr-2">
                          {item.createdAt}
                        </span>
                        <span className="is-size-6 has-text-grey ml-2">
                          {item?.user?.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        <div className="column is-one-fifth has-text-centered">
          <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/travel-agency-advertising-holiday-giveaway-design-template-b3283fa3823a73c28cd17d78886d4632_screen.jpg?ts=1654766594" />
        </div>
      </div>
    </div>
  );
};

export default PopularNews;
