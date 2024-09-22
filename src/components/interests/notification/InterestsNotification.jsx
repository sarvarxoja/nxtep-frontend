import "./share.css";
import { useEffect, useRef, useState } from "react";
import { SiteNotification } from "../../site_notification/SiteNotification";

export const InterestsNotification = ({ id, setShareActive }) => {
  const notificationRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:5173/status/${id}`).then(
      () => {
        setIsVisible(true);
        setTimeout(() => {
          setIsVisible(false);
        }, 3000);
      },
      (err) => {
        console.error("Failed to copy: ", err);
      }
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        setShareActive(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="shere_box">
        <ul>
          <li className="share_list" onClick={() => handleCopy()}>
            <i className="fas fa-link share_notification_icon"></i> Copy link
          </li>
          <li className="share_list">
            <i
              className="fas fa-brackets-curly share_notification_icon"
              onClick={() => handleGetEmbed()}
            ></i>
            Get embed code
          </li>
          <li className="share_list">
            <i className="fas fa-envelope share_notification_icon"></i>Sent
            direct message
          </li>
        </ul>
      </div>
      <SiteNotification notification={"copied"} isVisible={isVisible} />
    </>
  );
};
