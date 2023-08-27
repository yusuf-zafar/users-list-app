import React, { useState, useEffect } from "react";
import User from "./User";
import useCachedUsers from "../hooks/useCachedUsers";
import "./UsersList.css";
import PullToRefresh from "react-pull-to-refresh";
import axios from "axios";

const UsersList = ({ onToggleBookmark }) => {
  const usersPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const cachedUsers = useCachedUsers();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleToggleBookmark = (userToToggle) => {
    onToggleBookmark(userToToggle);
  };

  useEffect(() => {
    const delay = 300;
    const timeoutId = setTimeout(() => {
      const filteredUsers = cachedUsers.filter((user) =>
        user.login.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filteredUsers);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, cachedUsers]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const usersToDisplay = filteredUsers.slice(startIndex, endIndex);

  const renderPaginationButtons = () => {
    const paginationButtons = [];

    for (let i = 1; i <= totalPages; i++) {
      paginationButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }

    return paginationButtons;
  };

  // Pull-to-refresh handler
  const handleRefresh = async () => {
    setRefreshing(true);
    const cachedUsers = JSON.parse(localStorage.getItem("cachedUsers"));
    try {
      const response = await axios.get("https://api.github.com/users");

      const fetchedUsers = response.data.map((user) => ({
        ...user,
      }));

      const unmatchingFetchedUsers = fetchedUsers.filter(
        (fetchedUser) =>
          !cachedUsers.some((cachedUser) => cachedUser.id === fetchedUser.id)
      );

      const updatedFilteredUsers = [
        ...cachedUsers.filter(
          (cachedUser) =>
            !unmatchingFetchedUsers.some(
              (unmatchingUser) => unmatchingUser.id === cachedUser.id
            )
        ),
        ...unmatchingFetchedUsers,
      ];
      setFilteredUsers(updatedFilteredUsers);
      localStorage.setItem("cachedUsers", JSON.stringify(updatedFilteredUsers));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="users-list">
      <h2 style={{ color: "#007bff" }}>Users List</h2>
      <input
        type="text"
        placeholder="Search by user name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="pagination">{renderPaginationButtons()}</div>
      <PullToRefresh onRefresh={handleRefresh}>
        {refreshing ? "Loading..." : (<span>&darr; Drag this down to refresh &darr;</span>)}
      </PullToRefresh>

      {refreshing
        ? ""
        : usersToDisplay.map((user) => (
            <User
              key={user.id}
              user={user}
              onToggleBookmark={handleToggleBookmark}
            />
          ))}
    </div>
  );
};

export default UsersList;
