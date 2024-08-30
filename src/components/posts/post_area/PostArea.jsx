import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";

export const PostArea = () => {
  const [dataClass, setDataClass] = useState("post_cm_btn opacity");
  const [disabled, setDisabled] = useState(true);
  const [mediaType, setMediaType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [value, setValue] = useState({
    content: "",
  });

  
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

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log("handleSubmit called");

      const formData = new FormData();
      formData.append("media", selectedFile);
      formData.append("content", value.content);

      try {
        const response = await axios.post("/post/add", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setSelectedFile("");
        setSelectedMedia("");
        setValue({ content: "" });
      } catch (error) {
        console.log(error.message);
      }
    },
    [selectedFile, value.content]
  );

  useEffect(() => {
    const trimmedInput = value.content.trim();

    if (trimmedInput.length > 5) {
      setDisabled(false);
      setDataClass("post_cm_btn");
    }

    if (trimmedInput.length < 5) {
      setDisabled(true);
      setDataClass("post_cm_btn opacity");
    }
  }, [value.content]);

  return (
    <div className="data-box top hover-none">
      {profile.avatar ? (
        <img
          src={`http://localhost:1311/${profile.avatar}`}
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
    </div>
  );
};
