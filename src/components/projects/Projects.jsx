import _ from "lodash";
import "./projects.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { TitleComponent } from "../title/Title";
import { ProjectsController } from "./project_component/ProjectsController";

export const ProjectsComponent = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [select, setSelect] = useState("select");

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = _.throttle(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        loading
      )
        return;
      if (hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }, 300);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const fetchPosts = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/project/find/all?limit=10&page=${page}`
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

  return (
    <div className="body_controller">
      <TitleComponent title={"Projects"} />
      <div className="platforms_top">
      {data.map((e) => {
        return (
          <div key={e._id}>
            <ProjectsController id={e._id} project_logo={e.project_logo} />
          </div>
        );
      })}
      </div>
    </div>
  );
};
