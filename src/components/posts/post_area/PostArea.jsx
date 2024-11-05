import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import { useEffect, useState, useCallback } from "react";
import { SiteNotification } from "../../site_notification/SiteNotification";

export const PostArea = () => {
  const [mediaType, setMediaType] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dataClass, setDataClass] = useState("post_cm_btn opacity");
  const [value, setValue] = useState({
    content: "",
  });

  const dispatch = useDispatch();

  const [selectedMedia, setSelectedMedia] = useState(null);
  const { profile, loading, error } = useSelector((state) => state.profileData);

  function handleInputChange(e) {
    setValue((oldValues) => {
      return { ...oldValues, [e.target.name]: e.target.value };
    });
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedMedia(reader.result);
      setMediaType(file.type.startsWith("image/") ? "image" : "video");
    };
    setSelectedFile(event.target.files[0]);
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const removeFuction = () => {
    setSelectedMedia(null);
    setSelectedFile(null);
  };

  const handleEmojiToggle = () => {
    setShowEmojis(!showEmojis);
  };

  const handleEmojiClick = (emojiObject) => {
    const emoji = emojiObject.emoji;
    setValue((oldValues) => ({
      ...oldValues,
      content: oldValues.content + emoji,
    }));
  };

  const handleOutsideClick = (e) => {
    if (
      showEmojis &&
      !e.target.closest(".emoji-picker") &&
      !e.target.closest(".smile_icon")
    ) {
      setShowEmojis(false);
    }
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("media", selectedFile);
      formData.append("content", value.content);

      try {
        if (value.content.length > 300) {
          setIsVisible(true);
          setTimeout(() => {
            setIsVisible(false);
          }, 2000);

          return;
        }

        if (value.content.length < 1) {
          return;
        }

        const { data } = await axios.post("/post/add", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setSelectedFile("");
        setSelectedMedia("");
        setValue({ content: "" });

        dispatch({
          type: "ADD_NEW_POST",
          payload: data.postData,
        });
      } catch (error) {}
    },
    [selectedFile, value.content]
  );

  useEffect(() => {
    const trimmedInput = value.content?.trim() || "";

    if (trimmedInput.length > 5) {
      setDisabled(false);
      setDataClass("post_cm_btn");
    }

    if (trimmedInput.length < 5) {
      setDisabled(true);
      setDataClass("post_cm_btn opacity");
    }
  }, [value.content]);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showEmojis]);

  return (
    <div className="data-box top hover-none">
      {profile.avatar ? (
        <img
          src={`http://localhost:2310/${profile.avatar}`}
          alt=""
          className="user_avatar"
        />
      ) : (
        <div
          className="user-avatar"
          style={{ background: `${profile.background_color}` }}
        >
          {profile.name?.substr(0, 1)}
        </div>
      )}
      <div className="total-text">
        {selectedMedia && (
          <div>
            {mediaType === "image" ? (
              <div>
                <img
                  src={selectedMedia}
                  alt="Selected"
                  className="post_img_a2"
                  style={{ width: "300px", height: "auto" }}
                />
                <i
                  className="fas fa-times exit_x_icon"
                  onClick={removeFuction}
                ></i>
              </div>
            ) : (
              <video controls className="video-container" muted>
                <source src={selectedMedia} className="video_post" />
              </video>
            )}
          </div>
        )}
        <form action="" onSubmit={handleSubmit}>
          <TextareaAutosize
            className="export-input"
            placeholder="Write a new post"
            onChange={handleInputChange}
            value={value.content}
            name="content"
          />
          <div className="total-post">
            <label htmlFor="media">
              <i className="fas fa-image-polaroid file-icon" title="media"></i>
            </label>
            <i
              className="far fa-smile file-icon smile_icon"
              onClick={() => handleEmojiToggle()}
            ></i>
            <input
              type="file"
              className="file-input"
              id="media"
              accept="image/png, image/jpg, image/jpeg, video/mp4"
              onChange={handleImageChange}
            />
            <button className={dataClass} disabled={disabled}>
              Post
            </button>
          </div>
        </form>
      </div>
      {showEmojis && (
        <div className="emoji-picker">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
      <SiteNotification
        notification={"Content length must be less than 300"}
        isVisible={isVisible}
      />
    </div>
  );
};
