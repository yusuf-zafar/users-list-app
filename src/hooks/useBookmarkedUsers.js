import { useState, useEffect } from "react";
import useCachedUsers from "./useCachedUsers";

const useBookmarkedUsers = () => {
  const [bookmarkedUsers, setBookmarkedUsers] = useState(() => {
    const storedBookmarkedUsers = JSON.parse(
      localStorage.getItem("bookmarkedUsers")
    );
    return storedBookmarkedUsers || [];
  });

  const cachedUsers = useCachedUsers(bookmarkedUsers);

  useEffect(() => {
    localStorage.setItem("bookmarkedUsers", JSON.stringify(bookmarkedUsers));
  }, [bookmarkedUsers]);

  const toggleBookmark = (user) => {
    const updatedUsers = [...bookmarkedUsers];
    const existingUser = updatedUsers.find((u) => u.id === user.id);

    if (existingUser) {
      existingUser.bookmarked = false;
      setBookmarkedUsers(updatedUsers.filter((u) => u.id !== user.id));
    } else {
      user.bookmarked = true;
      setBookmarkedUsers([...updatedUsers, user]);
    }

    const updatedCachedUsers = cachedUsers.map((newUser) =>
      newUser.id === user.id ? user : newUser
    );
    localStorage.setItem("cachedUsers", JSON.stringify(updatedCachedUsers));
  };

  return [bookmarkedUsers, toggleBookmark];
};

export default useBookmarkedUsers;
