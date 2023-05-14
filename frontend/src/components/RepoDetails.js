import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loader from './Loader'

const RepoDetails = () => {
  const [repo, setRepo] = useState(null)
  const [commits, setCommits] = useState([])
  const { username, reponame } = useParams()

  useEffect(() => {
    fetch(`https://api.github.com/repos/${username}/${reponame}`)
      .then((response) => response.json())
      .then((data) => setRepo(data))
  }, [username, reponame])

  useEffect(() => {
    fetch(
      `https://api.github.com/repos/${username}/${reponame}/commits?per_page=5`,
    )
      .then((response) => response.json())
      .then((data) => setCommits(data))
  }, [username, reponame])

  if (!repo || commits.length === 0) return <Loader />

  return (
    <div>
      <h1>{repo.name}</h1>
      <p>{repo.description}</p>
      <p>Created at: {new Date(repo.created_at).toLocaleDateString()}</p>
      <p>
        Last commit date:{' '}
        {new Date(commits[0].commit.committer.date).toLocaleDateString()}
      </p>
      <h2>Last 5 commits:</h2>
      <ul>
        {commits.map((commit) => (
          <li key={commit.sha}>{commit.commit.message}</li>
        ))}
      </ul>
    </div>
  )
}

export default RepoDetails
