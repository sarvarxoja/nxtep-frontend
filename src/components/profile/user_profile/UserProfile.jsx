import "./profile.css";
import "../profile.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserPosts } from "../user_posts/Posts";
import { MainTitle } from "../../title/MainTitle";
import { UserReplies } from "../user_replies/Replies";
import { UserProjects } from "../user_projects/Projects";
import { Highlights } from "../user_highlights/Highlights";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { getMonthAndYear, truncateText } from "../../../utils/utils";

export const UserProfile = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reloadFetch, setReloadFetch] = useState(false);
  const [activeTab, setActiveTab] = useState("posts"); // default active tab

  let { username } = useParams();

  useEffect(() => {
    fetchPosts();
  }, [username, reloadFetch]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`users/${username}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };


  return (
    <div className="body_controller">
      <div>
        <div className="title_container">
        <MainTitle title={data.userData?.name} />
        </div>
        {data.userData?.profile_banner ? (
          <img
            src={`http://localhost:1311/${data.userData?.profile_banner}`}
            alt=""
            className="banner-225"
          />
        ) : (
          <div className="banner-225"></div>
        )}
        <div className="flex inter_follow_ava ">
          {data.userData?.avatar ? (
            <img
              src={`http://localhost:1311/${data.userData?.avatar}`}
              alt=""
              className="profile-default select"
            />
          ) : (
            <div
              className="user-avatar profile-default top22-a"
              style={{ background: `${data.userData?.background_color}` }}
            >
              <div>
              {data.userData?.name?.substring(0, 1)}
              </div>
            </div>
          )}
          <div>
            <button
              className={`follow_btn`}
              onClick={() => {
                handleFollow(data.userData?._id), clickFollow();
              }}
            >
              Following
            </button>
            <button
              className={`follow_btn edit_btn`}
              style={{ display: data.is_your ? "" : "none" }}
            >
              Edit
            </button>
          </div>
        </div>
        <div className="m2-container top-profile">
          <div>
            <h3 className="font-name title-a1">
              {data.userData?.name}
              <img
                src={`http://localhost:1311/${data.userData?.check_mark}`}
                alt=""
                className="checkmark_img checkmark_profile"
              />
            </h3>
          </div>
          <div className="username_controller">
            <span className="profile-username">{data.userData?.username}</span>
          </div>
          <p className="user_bio">{data.userData?.bio}</p>
          <div className="user_data_cotroller">
            {data.userData?.job && (
              <div className="profile-job flex">
                <i className="far fa-briefcase job_icon"></i>
                <span className="profile_inf">{data.userData?.job}</span>
              </div>
            )}
            {data.userData?.location && (
              <div className="profile-job flex">
                <i className="fal fa-map-marker-alt job_icon"></i>
                <span className="profile_inf">{data.userData.location}</span>
              </div>
            )}
            {data.userData?.created && (
              <div className="profile-job flex">
                <i className="fal fa-calendar-alt job_icon"></i>
                <span className="profile_inf">
                  {getMonthAndYear(data.userData?.created)}
                </span>
              </div>
            )}
            {data.userData?.link && (
              <div className="profile-job flex">
                <i className="fal fa-link job_icon"></i>
                <a
                  className="profile_inf link"
                  href={"https://x.com/TateNews_"}
                  target="_blank"
                >
                  {truncateText(data.userData?.link, 15)}
                </a>
              </div>
            )}
          </div>
          <div className="following_controller">
            <Link to={"following"} className="f_controller">
              <h2 className="font title_follow">
                <span className="follow_count">
                  {data.userData?.following_count}
                </span>
                <span className="followers_count">Following</span>
              </h2>
            </Link>
            <Link to={"followers"} className="f_controller">
              <h2 className="font title_follow">
                <span className="follow_count">
                  {data.userData?.followers_count}
                </span>
                <span className="followers_count">Followers</span>
              </h2>
            </Link>
          </div>
        </div>
        <div className="data-profil">
          <section className="mm-container">
            <ul className="ul-ad">
              <li
                className={`list-23 ${activeTab === "posts" ? "active" : ""}`}
                onClick={() => handleTabClick("posts")}
              >
                <Link className="link-ad23 font" to={`/${username}`}>
                  Posts
                </Link>
              </li>
              <li
                className={`list-23 ${activeTab === "replies" ? "active" : ""}`}
                onClick={() => handleTabClick("replies")}
              >
                <Link className="link-ad23 font" to={`replies`}>
                  Replies
                </Link>
              </li>
              <li
                className={`list-23 ${
                  activeTab === "highlights" ? "active" : ""
                }`}
                onClick={() => handleTabClick("highlights")}
              >
                <Link className="link-ad23 font" to={`highlights`}>
                  Highlights
                </Link>
              </li>
              <li
                className={`list-23 ${
                  activeTab === "projects" ? "active" : ""
                }`}
                onClick={() => handleTabClick("projects")}
              >
                <Link className="link-ad23 font" to={`projects`}>
                  Projects
                </Link>
              </li>
              {/* <li
                className={`list-23 ${activeTab === "news" ? "active" : ""}`}
                onClick={() => handleTabClick("news")}
              >
                <Link className="link-ad23 font" to={`news`}>
                  News
                </Link>
              </li> */}
            </ul>
          </section>
        </div>
      </div>
      <Routes>
        <Route path={`/`} element={<UserPosts />} />
        <Route
          path={`/replies`}
          element={<UserReplies user_id={data?.userData?._id} />}
        />
        <Route path={`/highlights`} element={<Highlights />} />
        <Route path={`/projects`} element={<UserProjects />} />
        {/* <Route path={`/news`} element={<UserNews />} /> */}
      </Routes>
    </div>
  );
};
