import "./explore.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ConversationItem from "./Conversation";
import { TitleComponent } from "../title/Title";
import { useLocation } from "react-router-dom";

export const ExploreComponent = () => {
  const [loading, setLoading] = useState(false);
  const [searchRes, setSearchRes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const location = useLocation();

  // URLdan qidiruv parametrlarini olish va inputga o'rnatish
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const qValue = queryParams.get("t");
    if (qValue) {
      setInputValue(qValue);
      searchUsers(qValue);  // URL'dan olingan qiymat bo'yicha qidiruvni boshlash
    }
  }, [location]);

  const searchUsers = (search) => {
    // setLoading(true);
    if (!search.length) {
      // setLoading(false);
      return setSearchRes([]);
    }
    axios
      .get(`/users/find/user?name=${search}`)
      .then((res) => {
        setSearchRes(res.data.userData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setSearchRes([]);
        // setLoading(false);
      });
  };

  // Input o'zgarishini boshqarish
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    searchUsers(newValue);
  };

  return (
    <div className="body_controller">
      <div className="title_container">
        <TitleComponent title={"Explore"} />
      </div>
      <i className="far fa-search icon-exp"></i>
      <input
        type="text"
        className="user_search explore-input"
        placeholder="Search"
        value={inputValue}
        onChange={handleInputChange}
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
