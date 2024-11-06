import axios from "axios";
import "./all_projects.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatCount, getTimeAgo } from "../../../utils/utils";

export const AllProjects = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`/project/find/all`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };

  console.log(data);

  return (
    <div className="container projects_style_controller">
      {data.map((e) => {
        return (
          <Link to={`/project/${e._id}`} key={e._id}>
            <img
              src={`http://localhost:2310/${e.project_logo}`}
              alt=""
              className="project_logo"
            />
            <div className="project_data_style">
              <div>
                {e.user_id.avatar ? (
                  <div className="avatar-box">
                    <img
                      src={`http://localhost:2310/${e.user_id.avatar}`}
                      alt=""
                      width={30}
                      height={30}
                      className="search_avatar"
                    />
                  </div>
                ) : (
                  <div
                    className="user-avatar search_default  avatar_project_page"
                    style={{ background: `${e.user_id.background_color}` }}
                  >
                    {e.user_id.name?.substr(0, 1)}
                  </div>
                )}
              </div>
              <div>
                <h2 className="project_name">{e.name}</h2>
                <div className="project_interests_data">
                  <span className="block">
                    {formatCount(e.views_count)} Views
                  </span>
                  <i className="fas fa-circle circle_icon"></i>
                  <span className="block">{getTimeAgo(e.date)}</span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
