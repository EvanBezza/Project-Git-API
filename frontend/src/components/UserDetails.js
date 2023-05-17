// Student Name: Evan Bezuidenhout
// Student Number: EB22010002711
// Level: 4
// Task: 30
// Compulsory Task: Yes
// File Name: UserDetails.js

import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import Loader from './Loader'
import '../style/userDetailsStyle.css'

const UserDetails = () => {
  // Define state variables
  const [user, setUser] = useState(null)
  const [repos, setRepos] = useState([])
  const { username } = useParams() // Extract username from the URL parameters
  const navigate = useNavigate() // Hook from react-router-dom to programmatically navigate

  // Hooks from react-router-dom to get the query parameters
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const searchTerm = searchParams.get('search')

  useEffect(() => {
    // Fetch user details from local server when component mounts or username changes
    fetch(`/api/users/${username}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
  }, [username])

  useEffect(() => {
    // Fetch user repositories when component mounts or username changes
    fetch(`/api/users/${username}/repos`)
      .then((response) => response.json())
      .then((data) => setRepos(data))
  }, [username])

  const handleBack = () => {
    // Function to navigate back to user list page
    navigate(`/users?username=${searchTerm}`)
  }

  // Show loader if user or repos are not loaded yet
  if (!user || repos.length === 0) return <Loader />

  return (
    <div>
      <section id="userProfileCard">
        <div className="leftSection">
          {/* Display user details */}
          <img className="userAvatar" src={user.avatar_url} alt={user.name} />
          <h1 className="userText">
            <a href={user.html_url} target="_blank">
              {user.name}
            </a>
          </h1>
          <p className="userText">{user.bio}</p>
          <p className="userText">{user.location}</p>
          <button type="submit" onClick={handleBack}>
            Back to Repos
          </button>{' '}
        </div>
        <div className="rightSection">
          {/* Display user repositories */}
          <h2 className="userHeadings">User Repositories:</h2>
          <ul className="userText">
            {repos.slice(0, 20).map((repo) => (
              <li key={repo.id}>
                <Link
                  className="repoLinks"
                  to={`/repo/${username}/${repo.name}`}
                >
                  {repo.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default UserDetails
