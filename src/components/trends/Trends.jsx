import { useDispatch, useSelector } from "react-redux";
import { MainTitle } from "../title/MainTitle";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchTrends } from "../banners/trends/TrendActions";

export const Trends = () => {
  const dispatch = useDispatch();
  let { trends, loading, error } = useSelector((state) => state.trendsData);

  useEffect(() => {
    dispatch(fetchTrends(4));
  }, [dispatch]);

  return (
    <div className="body_controller">
      <div className="title_container">
        <MainTitle title={"Trends"} />
      </div>
      <div>
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
      </div>
    </div>
  );
};
