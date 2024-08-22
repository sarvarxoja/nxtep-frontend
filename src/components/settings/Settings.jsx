import "./setting.css"; 
import { Link } from "react-router-dom";
import { TitleComponent } from "../title/Title";

export const SettingsComponent = () => {
  return (
    <div className="body_controller">
      <TitleComponent title={"Settings"} />
      <Link className="settings-link" to={"account"}>
        Account
        <i className="fas fa-chevron-right icon_right"></i>
      </Link>
      <Link className="settings-link" to={"site"}>
        Site <i className="fas fa-chevron-right icon_right"></i>
      </Link>
      <Link className="settings-link" to={"language"}>
        Language <i className="fas fa-chevron-right icon_right"></i>
      </Link>
      <a href="http://help.nextep.com" className="settings-link">
        Help Center <i className="fas fa-chevron-right icon_right"></i>
      </a>
    </div>
  );
};
