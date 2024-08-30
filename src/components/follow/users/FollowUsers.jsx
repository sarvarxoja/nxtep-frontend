import { Link, useParams } from "react-router-dom";

export const UsersFollow = ({ follow }) => {
  return (
    <div>
      {follow.map((e) => {
        return (
          <div className="flex flex_ctr">
            <div className="follow_ff_ctr pd_ctr">
              <div>
                <Link to={`/${e.username}`}>
                  {e.avatar ? (
                    <img
                      src={`http://localhost:1311/${e.avatar}`}
                      alt=""
                      className="user_avatar"
                    />
                  ) : (
                    <div
                      className="user-avatar"
                      style={{ background: `${e.background_color}` }}
                    >
                      {e.name.substr(0, 1)}
                    </div>
                  )}
                </Link>
              </div>
              <div>
                <div className="flex">
                  <h3 className="font-name">{e.name}</h3>
                  <img
                    src={`http://localhost:1311/${e.check_mark}`}
                    alt=""
                    className="main_check_m"
                  />
                </div>
                <Link className="font-username" to={`/${e.username}`}>
                  {e.username}
                </Link>
              </div>
            </div>
            <div className="btn_ctr">
              <button
                className={`${
                  e.is_following ? "unfollow_btn follow_btn" : "follow_btn"
                }`}
                onClick={() => {
                  handleFollowInMany(e._id);
                }}
              >
                {e.is_following ? "Unfollow" : "Follow"}
              </button>
              {/* <button className={`${block_btn} follow_btn edit_btn`}>
                Edit
              </button> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};
