import React, { useState, useEffect } from "react";
import User from "./User";
import "./BookmarkedUsers.css";

const BookmarkedUsers = ({ bookmarkedUsers, onToggleBookmark }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBookmarkedUsers, setFilteredBookmarkedUsers] =
    useState(bookmarkedUsers);

  useEffect(() => {
    const throttledSearch = setTimeout(() => {
      const filteredUsers = bookmarkedUsers.filter((user) =>
        user.login.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBookmarkedUsers(filteredUsers);
    }, 300);

    return () => clearTimeout(throttledSearch);
  }, [searchQuery, bookmarkedUsers]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="bookmarked-users">
      <h2 style={{ color: "#007bff" }}>Bookmarked Users</h2>
      <input
        type="text"
        placeholder="Search by user name"
        value={searchQuery}
        onChange={handleSearch}
      />
      {filteredBookmarkedUsers.map((user) => (
        <User key={user.id} user={user} onToggleBookmark={onToggleBookmark} />
      ))}
    </div>
  );
};

export default BookmarkedUsers;
