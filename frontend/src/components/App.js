// Student Name: Evan Bezuidenhout
// Student Number: EB22010002711
// Level: 4
// Task: 30
// Compulsory Task: Yes
// File Name: App.js

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Search from './Search.js'
import UserList from './UserList.js'
import UserDetails from './UserDetails.js'
import RepoDetails from './RepoDetails.js'

function App() { 
  // Render the application
  return (
    <Router>
      <div className="App">
        {/* Define different routes for the app */}
        <Routes>
          <Route path="/" element={<Search />} /> {/*Route the root path*/}
          <Route path="/users" element={<UserList />} /> {/*Route for user list*/}
          <Route path="/user/:username" element={<UserDetails />} /> {/*Route for user details*/}
          <Route path="/repo/:username/:reponame" element={<RepoDetails />} /> {/*Route for repository details*/}
        </Routes>
      </div>
    </Router>
  )
}

export default App
