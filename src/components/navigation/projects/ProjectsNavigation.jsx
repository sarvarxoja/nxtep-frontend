import "./projects.navigation.css"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import logo from "../../../images/free-twitter-logo-icon-2429-thumb.png";

export const ProjectsNavigation = () => {
  const { profile, loading, error } = useSelector((state) => state.profileData);

  console.log(profile);

  return (
    <div className="pr_ject_container">
      <nav className="project_navigation">
        <img src={logo} className="navbar_logo" />
        <ul>
          <li>
            <input type="text" className="projects_search"/>
          </li>
        </ul>
        <div className="project_functions">
          <Link>
            <AddCircleOutlineIcon />
          </Link>
          <Link>
            {profile.avatar ? (
              <div className="avatar-box">
                <img
                  src={`http://localhost:1311/${profile.avatar}`}
                  alt=""
                  width={30}
                  height={30}
                  className="search_avatar"
                />
              </div>
            ) : (
              <div
                className="user-avatar search_default"
                style={{ background: `${profile.background_color}` }}
              >
                {profile.name?.substr(0, 1)}
              </div>
            )}
          </Link>
        </div>
      </nav>
    </div>
  );
};
