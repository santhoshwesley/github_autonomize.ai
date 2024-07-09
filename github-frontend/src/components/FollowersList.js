import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchUserFollowers } from "../services/apiService";
import "../../src/styles/FollowersList.css";

const FollowersList = () => {
  const { username } = useParams();
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserFollowers(username);
        setFollowers(response.data);
      } catch (error) {
        console.error("Error fetching followers:", error.message);
      }
    };

    fetchData();
  }, [username]);

  return (
    <div className="followers-list-container">
      <ul className="followers-list">
        {followers.map((follower) => (
          <li key={follower.id} className="follower-item">
            <Link
              to={`/user/${follower.login}/repos`}
              className="follower-link"
            >
              <img
                src={follower.avatar_url}
                alt={`${follower.login} avatar`}
                className="follower-avatar"
              />
              <span className="follower-username">{follower.login}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowersList;
