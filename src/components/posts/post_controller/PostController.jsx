import axios from "axios";
import "./post.controller.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTimeAgo } from "../../../utils/utils";
import { VideoComponent } from "../../video/Video";
import { InterestsComponent } from "../../interests/Interests";
import { PostData } from "../PostData";

export const YourPosts = () => {
  const [data, setData] = useState([]);
  const [bold, setBold] = useState(null);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fotYouData();
  }, []);

  const fotYouData = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`/post/top/rtc?limit=5&&page=${page}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };

  console.log(data);

  return (
    <div>
      {data.map((e,index) => {
        return (
          <div key={index}>
            <PostData
              media={e.media}
              username={e.user_id.username}
              avatar={e.user_id.avatar}
              background_color={e.user_id.background_color}
              name={e.user_id.name}
              check_mark={e.user_id.check_mark}
              created={e.created}
              content={e.content}
              like_count={e.like_count}
              fke_view_count={e.fke_view_count}
              comments_count={e.comments_count}
              id={e._id}
            />
          </div>
        );
      })}
    </div>
  );
};
