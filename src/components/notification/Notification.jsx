import axios from "axios";
import "./notification.css";
import { Link } from "react-router-dom";
import { TitleComponent } from "../title/Title";
import { useEffect, useState, useRef } from "react";

export const NotificationComponent = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  return (
    <div className="body_controller">
      <TitleComponent title={"Notification"}/>
      <div>
        {data.length ? (
          data.map((e, index) => (
            <NotificationItem key={index} notification={e} />
          ))
        ) : (
          <h5 className="not_fnd_ntf">Not found notifications</h5>
        )}
        {/* {loading && (
          <div className="ctr_loading">
            <LoadingComponent />
          </div>
        )} */}
      </div>
    </div>
  );
};