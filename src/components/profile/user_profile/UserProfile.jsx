import "./profile.css";
import "../profile.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { UserPosts } from "../user_posts/Posts";
import { MainTitle } from "../../title/MainTitle";
import "react-loading-skeleton/dist/skeleton.css";
import { UserReplies } from "../user_replies/Replies";
import { UserProjects } from "../user_projects/Projects";
import { Highlights } from "../user_highlights/Highlights";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { getMonthAndYear, truncateText } from "../../../utils/utils";
// import AvatarCropper from "../edit_page/avatar_cropper/AvatarCropper";

export const UserProfile = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editPage, setEditPage] = useState(false);
  const [activeTab, setActiveTab] = useState("posts"); // default active tab
  const [reloadFetch, setReloadFetch] = useState(false);

  let { username } = useParams();

  useEffect(() => {
    setData([]);
    fetchPosts();
  }, [username, reloadFetch]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`users/${username}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  async function handleFollow(id) {
    try {
      let { data } = await axios.patch(`/users/${id}/following`);
      setData((prevData) => ({
        ...prevData,
        you_subscribed: data.msg === "follow_added" ? true : false,
        userData: {
          ...prevData.userData,
          followers_count:
            data.msg === "follow_added"
              ? prevData.userData.followers_count + 1
              : prevData.userData.followers_count - 1,
        },
      }));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="body_controller">
      <div>
        <div className="title_container">
          <MainTitle title={data.userData?.name} />
        </div>
        {data.userData?.profile_banner ? (
          <img
            src={`http://localhost:2310/${data.userData?.profile_banner}`}
            alt=""
            className="banner-225"
          />
        ) : (
          <div className="banner-225"></div>
        )}
        <div className="flex inter_follow_ava ">
          {data.userData?.avatar ? (
            <img
              src={`http://localhost:2310/${data.userData?.avatar}`}
              alt=""
              className="profile-default select"
            />
          ) : (
            <div
              className="user-avatar profile-default top22-a"
              style={{ background: `${data.userData?.background_color}` }}
            >
              <div>{data.userData?.name?.substring(0, 1)}</div>
            </div>
          )}
          <div>
            {data.is_your ? (
              <button
                className={`follow_btn edit_btn`}
                style={{ display: data.is_your ? "" : "none" }}
                onClick={() => setEditPage(!editPage)}
              >
                Edit
              </button>
            ) : (
              <button
                className={`${
                  data.you_subscribed ? "follow_btn unfollow_btn" : "follow_btn"
                }`}
                onClick={() => {
                  handleFollow(data.userData?._id);
                }}
              >
                {data.you_subscribed ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
        </div>
        <div className="m2-container top-profile">
          <div>
            {loading ? (
              <Skeleton width={150} height={25} />
            ) : (
              <h3 className="font-name title-a1">
                {data.userData?.name}
                <img
                  src={`http://localhost:2310/${data.userData?.check_mark}`}
                  alt=""
                  className="checkmark_img checkmark_profile"
                />
              </h3>
            )}
          </div>
          <div className="username_controller">
            {loading ? (
              <Skeleton width={120} height={23} />
            ) : (
              <span className="profile-username">
                {data.userData?.username}
              </span>
            )}
          </div>
          {loading ? (
            <Skeleton
              width={760}
              height={150}
              className="post_content user_bio"
            />
          ) : (
            <p className="post_content user_bio">{data.userData?.bio}</p>
          )}
          <div className="user_data_cotroller">
            {data.userData?.job && (
              <div>
                {loading ? (
                  <Skeleton width={120} height={20} />
                ) : (
                  <div className="profile-job flex">
                    <i className="far fa-briefcase job_icon"></i>
                    <span className="profile_inf">{data.userData?.job}</span>
                  </div>
                )}
              </div>
            )}
            {data.userData?.location && (
              <div>
                {loading ? (
                  <Skeleton width={225} height={20} />
                ) : (
                  <div className="profile-job flex">
                    <i className="fal fa-map-marker-alt job_icon"></i>
                    <span className="profile_inf">
                      {data.userData.location}
                    </span>
                  </div>
                )}
              </div>
            )}
            {data.userData?.created && (
              <div>
                {loading ? (
                  <Skeleton width={160} height={20} />
                ) : (
                  <div className="profile-job flex">
                    <i className="fal fa-calendar-alt job_icon"></i>
                    <span className="profile_inf">
                      {getMonthAndYear(data.userData?.created)}
                    </span>
                  </div>
                )}
              </div>
            )}
            {data.userData?.link && (
              <div>
                {loading ? (
                  <Skeleton width={150} height={20} />
                ) : (
                  <div className="profile-job flex">
                    <i className="fal fa-link job_icon"></i>
                    <a
                      className="profile_inf link"
                      href={data.userData?.link}
                      target="_blank"
                    >
                      {truncateText(data.userData?.link, 15)}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="following_controller">
            <Link to={"following"} className="f_controller">
              <h2 className="font title_follow">
                <span className="follow_count">
                  {loading ? (
                    <Skeleton width={15} height={20}/>
                  ) : (
                    data.userData?.following_count
                  )}
                </span>
                <span className="followers_count">Following</span>
              </h2>
            </Link>
            <Link to={"followers"} className="f_controller">
              <h2 className="font title_follow">
                <span className="follow_count">
                  {loading ? (
                    <Skeleton width={15} height={20} />
                  ) : (
                    data.userData?.followers_count
                  )}
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
