import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserSearch from "./components/UserSearch";
import UserRepos from "./components/UserRepos";
import RepoDetails from "./components/RepoDetails";
import FollowersList from "./components/FollowersList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserSearch />} />
        <Route path="/user/:username/repos" element={<UserRepos />} />
        <Route path="/repo/:username/:reponame" element={<RepoDetails />} />
        <Route path="/user/:username/followers" element={<FollowersList />} />
      </Routes>
    </Router>
  );
};

export default App;
