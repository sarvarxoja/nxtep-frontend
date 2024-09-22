import "../projects.css"
import { Link } from "react-router-dom";

export const ProjectsController = ({id, project_logo}) => {
  return (
        <Link to={`/project/${id}`}>
            <img
              src={`http://localhost:1311/${project_logo}`}
              alt=""
              className="logo_ad"
            />
        </Link>
  );
};
