import "./explore.css";
import axios from "axios";
import { useState } from "react";
import ConversationItem from "./Conversation";

export const ExploreComponent = () => {
  const [loading, setLoading] = useState(false);
  const [searchRes, setSearchRes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const searchUsers = (e) => {
    setLoading(true);
    const search = e.target.value;
    if (!search.length) {
      return setSearchRes([]);
    }
    axios
      .get(`/users/find/user?name=${search}`)
      .then((res) => {
        setSearchRes(res.data.userData);
      })
      .catch((err) => {
        console.log(err);
        setSearchRes([]);
      });
    setLoading(false);
  };
  return (
    <div className="body_controller">
      <h2 className="page-title">Explore</h2>
      <i className="far fa-search  icon-exp"></i>
      <input
        type="text"
        className="user_search explore-input"
        placeholder="Search"
        onChange={searchUsers}
        onFocus={() => setIsSearch(true)}
      />
      {isSearch ? (
        <div className="p-1">
          {searchRes.map((item, index) => (
            <ConversationItem
              key={index}
              name={item.name}
              check_mark={item.check_mark}
              avatar={item.avatar}
              background_color={item.background_color}
              username={item.username}
            />
          ))}
        </div>
      ) : (
        <div className="p-1"></div>
      )}
      {loading && (
        <div className="ctr_loading">
          <LoadingComponent />
        </div>
      )}
    </div>
  );
};
