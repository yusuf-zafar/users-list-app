import { useEffect, useState } from "react";
import axios from "axios";

const useCachedUsers = (bookmarkedUsers) => {
  const [cachedUsers, setCachedUsers] = useState([]);

  useEffect(() => {
    const cachedUsers = JSON.parse(localStorage.getItem("cachedUsers"));

    if (cachedUsers) {
      setCachedUsers(cachedUsers);
    } else {
      axios.get("https://api.github.com/users").then((response) => {
        const fetchedUsers = response.data.map((user) => ({
          ...user,
          bookmarked: false,
        }));
        setCachedUsers(fetchedUsers);
        localStorage.setItem("cachedUsers", JSON.stringify(fetchedUsers));
      });
    }
  }, [bookmarkedUsers]);

  return cachedUsers;
};

export default useCachedUsers;
