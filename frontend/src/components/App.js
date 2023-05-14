import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./Search.js";
import UserDetails from "./UserDetails.js";
import RepoDetails from "./RepoDetails.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Search />
        <Routes>
          <Route path="/user/:username" element={<UserDetails />} />
          <Route path="/repo/:username/:reponame" element={<RepoDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
