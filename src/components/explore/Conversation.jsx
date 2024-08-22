import React from "react";
import axios from "axios";
import "./explore.css";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { incremented } from "../reducers/counter";

const ConversationItem = ({
  avatar,
  background_color,
  name,
  check_mark,
  username,
}) => {
  return (
    <div className="main_repo">
      <Link to={`/${username}`} className="user_search_data">
        <div>
          {avatar ? (
            <img
              src={`http://localhost:1311/${avatar}`}
              alt=""
              className="search_avatar"
            />
          ) : (
            <div
              className="user-avatar search_default"
              style={{ background: `${background_color}` }}
            >
              {name?.substring(0, 1)}
            </div>
          )}
        </div>
        <div>
          <div className="flex">
            <h3 className="font-name">{name}</h3>
            <img
              src={`http://localhost:1311/${check_mark}`}
              alt=""
              className="checkmark_img checkmark_profile"
            />
          </div>
          <span className="profile-username">{username}</span>
        </div>
      </Link>
    </div>
  );
};

export default ConversationItem;
