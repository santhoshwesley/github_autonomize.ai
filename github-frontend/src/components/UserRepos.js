import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "../../src/styles/UserRepos.css";

const UserRepos = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { username } = useParams();

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/${username}/repos`
        );
        console.log(response);
        setRepositories(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [username]);

  if (loading) {
    return <p className="loading-message">Loading repositories...</p>;
  }

  if (error) {
    return (
      <p className="error-message">Error fetching repositories: {error}</p>
    );
  }

  if (repositories.length === 0) {
    return (
      <p className="no-repos-message">No repositories found for {username}.</p>
    );
  }

  return (
    <div className="user-repos-container">
      <h2 className="repo-header">Repositories for {username}</h2>
      <ul className="user-repo-list">
        {repositories.map((repo, index) => (
          <li key={index} className="user-repo-card">
            {repo.owner && repo.owner.avatar_url && (
              <img
                src={repo.owner.avatar_url}
                alt={`${repo.owner.login} avatar`}
                className="repo-avatar"
              />
            )}
            <div className="user-repo-details">
              <Link
                to={`/repo/${username}/${repo.name}`}
                className="user-repo-name"
              >
                {repo.name}
              </Link>
              <p className="user-repo-description">{repo.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserRepos;
