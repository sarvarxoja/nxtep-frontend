import "./project_type.css"
import types_data from "./types.json";

export const ProjectsType = () => {
  return (
    <div className="container types_controller">
      {types_data.map((e, index) => {
        return (
            <div key={index}>
                <span className="content_type">{e.name}</span>
            </div>
        );
      })}
    </div>
  );
};
