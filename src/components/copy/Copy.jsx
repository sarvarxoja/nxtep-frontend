export const CopyComponent = () => {
  return (
    <div
      onClick={() => copyLink(e._id)}
      className="sender_page"
      style={{ display: e.copy_btn ? "block" : "none" }}
    >
      <i className="far fa-link icon_copy"></i> Copy Link
    </div>
  );
};
