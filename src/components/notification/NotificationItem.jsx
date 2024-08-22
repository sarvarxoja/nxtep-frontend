import { useEffect, useRef } from "react";

export const NotificationItem = ({ notification }) => {
    const ref = useRef();
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        async (entries) => {
          if (entries[0].isIntersecting) {
            try {
              await axios.get(`/notification/id/${notification._id}`);
            } catch (error) {
              console.error(error);
            }
          }
        },
        { threshold: 1.0 }
      );
  
      if (ref.current) {
        observer.observe(ref.current);
      }
  
      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, [notification]);
  
    return (
      <div ref={ref} className="notification_controller">
        <Link to={`/${notification.user_id.username}`}>
          {notification.user_id.avatar ? (
            <img
              src={`http://localhost:1311/${notification.user_id.avatar}`}
              alt=""
              className="user_avatar"
            />
          ) : (
            <div
              className="user-avatar"
              style={{ background: `${notification.user_id.background_color}` }}
            >
              {notification.user_id.name.substr(0, 1)}
            </div>
          )}
        </Link>
        <div className="total-text">
          <Link
            to={`/${notification.user_id.username}`}
            className="link_status_ctr_1"
          >
            <p className="post_text notification_content">
              {notification.content}
            </p>
            <div className="">
              <Link to={`/${notification.user_id.username}`}>
                <div className="flex ">
                  <h3 className="font-name">{notification.user_id.name}</h3>
                  <img
                    src={`http://localhost:1311/${notification.user_id.check_mark}`}
                    alt=""
                    className="main_check_m"
                  />
                  <span className="font-username">
                    {notification.user_id.username}
                  </span>
                </div>
              </Link>
            </div>
            <span className="notification_date">
              {createdDate(notification.time)}
            </span>
          </Link>
        </div>
      </div>
    );
  };