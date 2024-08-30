import "./title.css";
import { Link } from "react-router-dom";

export const MainTitle = ({ title, paddingLeft }) => {
  return (
    <div>
      <h2 className="page-title title_add_project_page" style={{paddingLeft: paddingLeft}}>
        <Link to={-1}>
          <i className="fas fa-arrow-left icon_left"></i>
        </Link>
        <div>
        {title}
        </div>
      </h2>
    </div>
  );
};
