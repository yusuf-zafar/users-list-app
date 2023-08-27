import React, { useState } from "react";
import UsersList from "./UsersList";
import BookmarkedUsers from "./BookmarkedUsers";
import useBookmarkedUsers from "../hooks/useBookmarkedUsers";
import "./TabNavigation.css";

const TabNavigation = () => {
  const [bookmarkedUsers, toggleBookmark] = useBookmarkedUsers();
  const [activeTab, setActiveTab] = useState("users");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === "users" ? "active" : ""}`}
          onClick={() => handleTabChange("users")}
        >
          Users List
        </button>
        <button
          className={`tab-button ${activeTab === "bookmarked" ? "active" : ""}`}
          onClick={() => handleTabChange("bookmarked")}
        >
          Bookmarked Users
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "users" ? (
          <UsersList onToggleBookmark={toggleBookmark} />
        ) : (
          <BookmarkedUsers
            bookmarkedUsers={bookmarkedUsers}
            onToggleBookmark={toggleBookmark}
          />
        )}
      </div>
    </div>
  );
};

export default TabNavigation;
