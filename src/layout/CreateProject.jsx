import { Outlet } from "react-router-dom";
import { NavigationComponent } from "../components/navigation/Navigation";

const ProjectsLayout = () => {
  return (
    <div className="project_layout container">
      <NavigationComponent />
      <Outlet />
    </div>
  );
};

export default ProjectsLayout;
