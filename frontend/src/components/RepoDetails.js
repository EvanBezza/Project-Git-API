// Student Name: Evan Bezuidenhout
// Student Number: EB22010002711
// Level: 4
// Task: 30
// Compulsory Task: Yes
// File Name: RepoDetails.js

import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom' // import useNavigate
import Loader from './Loader'
import '../style/repoDetailsStyle.css'

const RepoDetails = () => {
  // Define state variable
  const [repoData, setRepoData] = useState(null)
  // Extract username and repository name from the URL parameters
  const { username, reponame } = useParams()
  // Initialize useNavigate for programmatic navigation
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch repository details from local server when component mounts or username/reponame changes
    fetch(`/api/repos/${username}/${reponame}`)
      .then((response) => response.json())
      .then((data) => setRepoData(data))
  }, [username, reponame])

  const handleBack = () => {
    // Function to navigate back to user details page
    navigate(`/user/${username}`)
  }

  // Show loader if repository data is not loaded yet
  if (!repoData) return <Loader />

  // Destructure repository data and commits from repoData
  const { repo, commits } = repoData

  return (
    <div>
      <section id="repoDetailsCard">
        <div className="repoContainer">
          {/* Display repository details */}
          <h1 className="repoHeading">{repo.name}</h1>
          <p className="repoText">{repo.description}</p>
          <p className="repoText">
            Created at: {new Date(repo.created_at).toLocaleDateString()}
          </p>
          <p className="repoText">
            Last commit date:{' '}
            {new Date(commits[0].commit.author.date).toLocaleDateString()}
          </p>
          <h2 className="repoHeading">Last 5 commits:</h2>
          <ul>
            {/* Display last 5 commits */}
            {commits.map((commit) => (
              <li className="repoText" key={commit.sha}>
                {commit.commit.message}
              </li>
            ))}
          </ul>
          <button type="submit" onClick={handleBack}>
            Back to Repos
          </button>{' '}
        </div>
      </section>
    </div>
  )
}

export default RepoDetails
