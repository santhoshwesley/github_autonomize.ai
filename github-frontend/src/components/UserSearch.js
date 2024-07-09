import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/styles/UserSearch.css";

const UserSearch = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/user/${username}/repos`);
  };

  return (
    <div className="user-search-container">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="user-search-input"
        placeholder="Enter GitHub username"
      />
      <button onClick={handleSearch} className="user-search-button">
        Search
      </button>
    </div>
  );
};

export default UserSearch;
