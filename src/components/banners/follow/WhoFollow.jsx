import "../banner.css";
import _ from "lodash";
import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFollowPeople } from "./FollowAction";

export const WhoFollowBanner = () => {
  const dispatch = useDispatch();
  const [myProfile, setMyProfile] = useState(null);

  let { who_to_follow, loading, error } = useSelector(
    (state) => state.who_to_followData
  );

  useEffect(() => {
    dispatch(fetchFollowPeople(3));
  }, [dispatch]);

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
      <div className="left">
        <div className="users_box">
          <h3 className="banner_title">Who to follow</h3>
          {who_to_follow.map((i, index) => {
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
          <Link className="show_more_span" to={"/people"}>
            Show more
          </Link>
        </div>
      </div>
    </div>
  );
};
