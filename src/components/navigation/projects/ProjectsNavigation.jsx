import "./projects.navigation.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

export const ProjectsNavigation = () => {
  const { profile, loading, error } = useSelector((state) => state.profileData);

  console.log(profile);

  return (
    <div>
      <nav className="project_navigation">
        <ul>
          <li>
            <input
              type="text"
              className="projects_search"
              placeholder="serch project"
            />
            
            <i className="far fa-search search_icon_project_navigation"></i>
          </li>
        </ul>
        <div className="project_functions">
          <Link>
            <i className="fad fa-layer-plus add_project_icon"></i>
          </Link>
          <Link to={`/${profile.username}/projects avatar_project_page`}>
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
                className="user-avatar search_default  avatar_project_page"
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
