import React from "react";

const User = ({ user, onToggleBookmark }) => {
  const handleToggleBookmark = () => {
    user.bookmarked = !user.bookmarked;
    onToggleBookmark(user);
  };

  return (
    <div className="user">
      <img src={user.avatar_url} alt={user.login} />
      <p>{user.login}</p>
      <button onClick={handleToggleBookmark}>
        {user.bookmarked ? "Unselect" : "Select"}
      </button>
    </div>
  );
};

export default User;
