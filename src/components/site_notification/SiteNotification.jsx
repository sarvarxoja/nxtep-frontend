import "./site_notification.css";

export const SiteNotification = ({ notification, isVisible }) => {
  return (
    <div className={`site_notification_box ${isVisible ? "show" : "hide"}`}>
      <span className="content_ntf">{notification}</span>
    </div>
  );
};
