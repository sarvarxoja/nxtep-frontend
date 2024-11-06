import { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import axios from "axios";
import { ProjectsController } from "../../project_components/project_component/ProjectsController";

export const UserProjects = ({setActiveTab}) => {
  setActiveTab("projects")
  const { username } = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [select, setSelect] = useState("select");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `users/get/user/${username}/content/projects?limit=10&page=1`
      );

      setData(data.projectsData);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };

  return (
    <div className="platforms_top">
      {data.map((e) => {
        return (
          <div key={e._id}>
            <ProjectsController id={e._id} project_logo={e.project_logo} />
          </div>
        );
      })}
    </div>
  );
};
