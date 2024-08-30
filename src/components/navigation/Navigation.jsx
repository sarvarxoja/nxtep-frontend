import "./navigation.css";
import { Link } from "react-router-dom";
import Logo from "../../images/free-twitter-logo-icon-2429-thumb.png";
import { useSelector } from "react-redux";

export const NavigationComponent = () => {
  const { profile, loading, error } = useSelector((state) => state.profileData);

  return (
    <div className="main-header">
      <nav className="header-navbar container">
        <div>
          <Link to={"/home"}>
            <img src={Logo} alt="" className="navbar_logo" />
          </Link>
        </div>
        <ul className="list-control">
          <li className="navbar-list">
            <Link to={"/home"} className="navbar-link flex">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="icon_home">
                <g>
                  <path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913h6.638c.511 0 .929-.41.929-.913v-7.075h3.008v7.075c0 .502.418.913.929.913h6.639c.51 0 .928-.41.928-.913V7.904c0-.301-.158-.584-.408-.758zM20 20l-4.5.01.011-7.097c0-.502-.418-.913-.928-.913H9.44c-.511 0-.929.41-.929.913L8.5 20H4V8.773l8.011-5.342L20 8.764z"></path>
                </g>
              </svg>
              <span className="main_navigaiton">
              Home
              </span>
            </Link>
          </li>
          <li className="navbar-list">
            <Link to={"/projects"} className="navbar-link">
              <i className="far fa-project-diagram  project-icon"></i> Projects
            </Link>
          </li>
          <li className="navbar-list">
            <Link to={"/projects"} className="navbar-link">
            <i className="far fa-envelope navbar-icon"></i> Messages
            </Link>
          </li>
          <li className="navbar-list">
            <Link to={"/explore"} className="navbar-link">
              <i className="far fa-search navbar-icon"></i> Explore
            </Link>
          </li>
          <li className="navbar-list">
            <Link to={"/notification"} className="navbar-link">
              {/* <svg viewBox="0 0 24 24" aria-hidden="true" className="icon"><title/><path d="M15.984 17.016v-6c0-2.484-1.5-4.5-3.984-4.5s-3.984 2.016-3.984 4.5v6h7.969zM18 15.984l2.016 2.016v0.984h-16.031v-0.984l2.016-2.016v-4.969c0-3.094 1.641-5.625 4.5-6.328v-0.703c0-0.844 0.656-1.5 1.5-1.5s1.5 0.656 1.5 1.5v0.703c2.859 0.703 4.5 3.281 4.5 6.328v4.969zM12 21.984c-1.078 0-2.016-0.891-2.016-1.969h4.031c0 1.078-0.938 1.969-2.016 1.969z"/></svg> */}
              <i className="far fa-bell navbar-icon"></i> Notifications
            </Link>
          </li>
          <li className="navbar-list">
            <Link to={"/settings"} className="navbar-link">
              <i className="far fa-cog navbar-icon"></i>
              Settings
            </Link>
          </li>
          <li className="navbar-list">
            <Link className="navbar-link" to={`/${profile.username}`}>
              <i className="far fa-user navbar-icon"></i> Profile
            </Link>
          </li>
          <li className="navbar-list">
            <Link to={"/create/project"} className="navbar-link create_project">
              Create ^
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
