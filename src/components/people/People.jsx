import { useDispatch, useSelector } from "react-redux";
import { MainTitle } from "../title/MainTitle";
import { useEffect } from "react";
import { fetchFollowPeople } from "../banners/follow/FollowAction";
import { Link } from "react-router-dom";

export const People = () => {
  const dispatch = useDispatch();
  let { who_to_follow, loading, error } = useSelector(
    (state) => state.who_to_followData
  );

  useEffect(() => {
    dispatch(fetchFollowPeople(100));
  }, []);

  return (
    <div className="body_controller">
      <div className="title_container">
        <MainTitle title={"Who to follow"} />
      </div>
      {who_to_follow.map((i, index) => {
        return (
          <div
            key={index}
            className="ad_users_controller"
          >
            <Link to={`/${i.username}`} key={i._id}>
              <div className="box-of-ceo">
                {i.avatar ? (
                  <div className="avatar-box">
                    <img
                      src={`http://localhost:1311/${i.avatar}`}
                      alt=""
                      width={30}
                      height={30}
                      className="search_avatar"
                    />
                  </div>
                ) : (
                  <div
                    className="user-avatar search_default"
                    style={{ background: `${i.background_color}` }}
                  >
                    {i.name.substr(0, 1)}
                  </div>
                )}
                <div>
                  <div className="check-text cepi_22">
                    <h3 className="font-name">{i.name}</h3>
                    <img
                      src={`http://localhost:1311/${i.check_mark}`}
                      alt=""
                      className="checkmark_img"
                      width={30}
                    />
                  </div>
                  <p className="font-username">{i.username}</p>
                </div>
              </div>
            </Link>
            <div>
              <button
                className={`${
                  i.is_following ? "unfollow_btn follow_btn" : "follow_btn"
                }`}
              >
                {i.is_following ? "Unfollow" : "Follow"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
