import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../src/styles/RepoDetails.css";

const RepoDetails = () => {
  const { username, reponame } = useParams();
  const [repo, setRepo] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const repoResponse = await axios.get(
          `http://localhost:5000/repos/${username}/repos/${reponame}`
        );
        setRepo(repoResponse.data);

        const followersResponse = await axios.get(
          `https://api.github.com/users/${repoResponse.data.owner.login}/followers`
        );
        setFollowers(followersResponse.data);

        const followingResponse = await axios.get(
          `https://api.github.com/users/${repoResponse.data.owner.login}/following`
        );
        setFollowing(followingResponse.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [username, reponame]);

  if (error) {
    return (
      <p className="error-message">
        Error fetching repository details: {error}
      </p>
    );
  }

  if (!repo) {
    return <p className="loading-message">Loading repository details...</p>;
  }

  return (
    <div className="repo-details-container">
      <div className="repo-card">
        {repo.owner && repo.owner.avatar_url && (
          <img
            src={repo.owner.avatar_url}
            alt={`${repo.owner.login} avatar`}
            className="repo-avatar"
          />
        )}
        <div className="repo-info">
          <h1 className="repo-title">{repo.name}</h1>
          <p className="repo-description">{repo.description}</p>
          <p className="repo-owner">Owner: {repo.owner.login}</p>
          <p className="repo-followers">Followers: {followers.length}</p>
          <p className="repo-following">Following: {following.length}</p>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="repo-url"
          >
            View Repository on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default RepoDetails;
