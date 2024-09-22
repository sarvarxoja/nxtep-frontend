import "../banner.css";
// import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrends } from "./TrendActions";

export const TrendsBanner = () => {
  const dispatch = useDispatch();
  const { trends, loading, error } = useSelector((state) => state.trendsData);


  useEffect(() => {
    dispatch(fetchTrends(3));
  }, [dispatch]);

  return (
    <div className="left">
      <div className="users_box trends_box">
        <h2 className="banner_title">Trends</h2>
        {trends.map((e, index) => {
          const cleanTag = e.tag.replace("#", "");
          return (
            <div className="trend_name" key={index}>
              <Link to={`/explore?t=${cleanTag}`} className="trends_content">
                <h3>{e.tag}</h3>
                <span>{e.posts} posts</span>
              </Link>
            </div>
          );
        })}
        {/* <div className="trend_name">
          <h3>#TOPG</h3>
          <span>223 posts</span>
        </div>
        <div className="trend_name">
          <h3>#TOPG</h3>
          <span>223 posts</span>
        </div>
        <div className="trend_name">
          <h3>#TOPG</h3>
          <span>223 posts</span>
        </div>
        <div className="trend_name">
          <h3>#TOPG</h3>
          <span>223 posts</span>
        </div> */}
        <Link to={"/trends"} className="show_more_span">
          Show more
        </Link>
      </div>
    </div>
  );
};
