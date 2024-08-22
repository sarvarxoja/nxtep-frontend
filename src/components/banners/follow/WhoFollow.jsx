import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import "../banner.css";
import { TitleComponent } from "../../title/Title";

export const WhoFollowBanner = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [myProfile, setMyProfile] = useState(null);

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/users/who/to/follow?limit=3&page=${page}`
      );
      console.log(response);

      const newPosts = response.data;
      setData((prevPosts) => [...prevPosts, ...newPosts]);
      if (newPosts.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };

  // async function handleFollowInMany(to_user) {
  //   try {
  //     let response = await axios.patch(`/users/${to_user}/following`);
  //     if (response.data.msg === "follow added") {
  //       axios.post(
  //         "/notification/add",
  //         {
  //           content: "sizga obuna boldi",
  //           to_user: to_user,
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );

  //       setData(
  //         data.map((data) => {
  //           if (data._id === to_user) {
  //             return {
  //               ...data,
  //               is_following: true,
  //             };
  //           }
  //           return data;
  //         })
  //       );
  //     }

  //     if (response.data.msg === "follow removed") {
  //       setData(
  //         data.map((data) => {
  //           if (data._id === to_user) {
  //             return {
  //               ...data,
  //               is_following: false,
  //             };
  //           }
  //           return data;
  //         })
  //       );
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }

  return (
    <div>
      <div className="left banner_box">
        <div className="users_box">
          <h3 className="banner_title">Who to follow</h3>
          {data.map((i, index) => {
            return (
              <div
                key={index}
                className="ad_users_controller"
                style={{ display: myProfile?._id == i._id ? "none" : "0" }}
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
          <span className="show_more_span">Show more</span>
        </div>
      </div>
    </div>
  );
};
